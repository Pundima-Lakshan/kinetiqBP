import { FileInputFormControl } from '@/components/molecules/file-field-form-control.tsx';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { checkTemplate, cloneDeep, Lang, Template } from '@pdfme/common';
import { Designer } from '@pdfme/ui';
import React, { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  downloadJsonFile,
  downloadPDF,
  generatePdf,
  getFontsData,
  getPlugins,
  getTemplateByPreset,
  getTemplatePresets,
  handleLoadTemplate,
  readFile,
  translations,
} from '../helper.ts';

const initialTemplatePresetKey = 'blank';
const customTemplatePresetKey = 'custom';

const templatePresets = getTemplatePresets();

export interface PdfDesignerProps {
  initialTemplate?: Template;
  initialTemplatePreset?: string;
  initialPdf?: ArrayBuffer | Uint8Array | string;
  initialPdfName?: string;
}

export interface PdfDesignerRefObj {
  generatePdf: () => Promise<File | undefined>;
}

export type PdfDesignerRef = ForwardedRef<PdfDesignerRefObj>;

export const PdfDesignerRenderer = (
  { initialPdf, initialPdfName, initialTemplate, initialTemplatePreset }: PdfDesignerProps,
  ref: PdfDesignerRef,
) => {
  const designerElementRef = useRef<HTMLDivElement | null>(null);
  const designerRef = useRef<Designer | null>(null);
  const [lang, setLang] = useState<Lang>('en');
  const [templatePreset, setTemplatePreset] = useState<string>(initialTemplatePreset ?? initialTemplatePresetKey);
  const [template, setTemplate] = useState<Template>(initialTemplate ?? getTemplateByPreset(templatePreset, initialPdf));

  useImperativeHandle(ref, () => {
    return {
      generatePdf: async () => {
        if (!designerRef.current) return;
        const result = await generatePdf(designerRef.current);
        if (!result) return;
        return new File([result], initialPdfName ?? 'updated.pdf', { type: 'application/pdf' });
      },
    };
  }, []);

  const buildDesigner = () => {
    checkTemplate(template);
    getFontsData().then((font) => {
      if (designerElementRef.current) {
        designerRef.current = new Designer({
          domContainer: designerElementRef.current,
          template,
          options: {
            font,
            lang,
            labels: {
              clear: 'clear', // Add custom labels to consume them in your own plugins
            },
            theme: {
              token: {
                colorPrimary: '#1564be',
                borderRadius: 1.5,
              },
            },
            icons: {
              multiVariableText:
                '<svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.643,13.072,17.414,2.3a1.027,1.027,0,0,1,1.452,0L20.7,4.134a1.027,1.027,0,0,1,0,1.452L9.928,16.357,5,18ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>',
            },
          },
          plugins: getPlugins(),
        });
      }
    });
  };

  const onChangeBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      readFile(e.target.files[0], 'dataURL').then(async (basePdf) => {
        if (designerRef.current) {
          let clearFields = false;
          if (window.confirm('Do you want to clear the existing fields ?')) {
            clearFields = true;
          }
          const updatedTemplate = clearFields ? { basePdf, schemas: [{}] } : { basePdf };
          designerRef.current.updateTemplate(Object.assign(cloneDeep(designerRef.current.getTemplate()), updatedTemplate));
          setTemplatePreset(customTemplatePresetKey);
          e.target.value = '';
        }
      });
    }
  };

  const onClearFields = () => {
    if (designerRef.current) {
      designerRef.current.updateTemplate(Object.assign(cloneDeep(designerRef.current.getTemplate()), { schemas: [{}] }));
      setTemplatePreset(customTemplatePresetKey);
    }
  };

  const onDownloadTemplate = () => {
    if (designerRef.current) {
      downloadJsonFile(designerRef.current.getTemplate(), 'template');
    }
  };

  const onChangeTemplatePresets = (e: SelectChangeEvent) => {
    setTemplatePreset(e.target.value);
    const newTemplate = getTemplateByPreset(e.target.value);
    setTemplate(newTemplate);
    designerRef.current?.updateTemplate(newTemplate);
  };

  useEffect(() => {
    buildDesigner();
    return () => {
      designerRef.current?.destroy();
    };
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0 1rem',
          margin: '0.5rem 0rem',
          fontSize: 'small',
        }}
      >
        <FormControl variant="outlined" size="small">
          <InputLabel>Template</InputLabel>
          <Select onChange={onChangeTemplatePresets} value={templatePreset} label="Template">
            {templatePresets.map((preset) => (
              <MenuItem key={preset.key} disabled={preset.key === customTemplatePresetKey} value={preset.key}>
                {preset.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small">
          <InputLabel>Language</InputLabel>
          <Select
            label="Language"
            onChange={(e) => {
              setLang(e.target.value as Lang);
              if (designerRef.current) {
                designerRef.current.updateOptions({ lang: e.target.value as Lang });
              }
            }}
            value={lang}
          >
            {translations.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FileInputFormControl handleChange={onChangeBasePDF} label="Upload BasePDF" accept=".pdf" />

        <FileInputFormControl
          handleChange={(e) => {
            handleLoadTemplate(e as React.ChangeEvent<HTMLInputElement>, designerRef.current);
          }}
          label="Upload Template"
        />

        <FormControl size="small">
          <Button variant="outlined" onClick={onClearFields}>
            Clear Fields
          </Button>
        </FormControl>

        <FormControl size="small">
          <Button variant="outlined" onClick={onDownloadTemplate}>
            Download Template
          </Button>
        </FormControl>

        <FormControl size="small">
          <Button variant="outlined" onClick={() => downloadPDF(designerRef.current)}>
            Generate PDF
          </Button>
        </FormControl>
      </Box>
      <div ref={designerElementRef} style={{ width: '100%', height: `calc(100% - 40px)` }} />
    </div>
  );
};

export const PdfDesigner = forwardRef(PdfDesignerRenderer);
