import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, styled, type SelectChangeEvent } from '@mui/material';
import { checkTemplate, cloneDeep, Lang, Template } from '@pdfme/common';
import { Designer } from '@pdfme/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
  downloadJsonFile,
  generatePDF,
  getFontsData,
  getPlugins,
  getTemplateByPreset,
  getTemplatePresets,
  handleLoadTemplate,
  readFile,
  translations,
} from '../helper.ts';

const initialTemplatePresetKey = 'invoice';
const customTemplatePresetKey = 'custom';

const templatePresets = getTemplatePresets();

export const PdfDesigner = () => {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);
  const [lang, setLang] = useState<Lang>('en');
  const [templatePreset, setTemplatePreset] = useState<string>(localStorage.getItem('templatePreset') || initialTemplatePresetKey);

  const buildDesigner = () => {
    let template: Template = getTemplateByPreset(localStorage.getItem('templatePreset') || '');
    try {
      const templateString = localStorage.getItem('template');
      if (templateString) {
        setTemplatePreset(customTemplatePresetKey);
      }

      const templateJson = templateString ? JSON.parse(templateString) : getTemplateByPreset(localStorage.getItem('templatePreset') || '');
      checkTemplate(templateJson);
      template = templateJson as Template;
    } catch {
      localStorage.removeItem('template');
    }

    getFontsData().then((font) => {
      if (designerRef.current) {
        designer.current = new Designer({
          domContainer: designerRef.current,
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
        designer.current.onSaveTemplate(onSaveTemplate);
        designer.current.onChangeTemplate(() => {
          setTemplatePreset(customTemplatePresetKey);
        });
      }
    });
  };

  const onChangeBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      readFile(e.target.files[0], 'dataURL').then(async (basePdf) => {
        if (designer.current) {
          designer.current.updateTemplate(
            Object.assign(cloneDeep(designer.current.getTemplate()), {
              basePdf,
            }),
          );
        }
      });
    }
  };

  const onDownloadTemplate = () => {
    if (designer.current) {
      downloadJsonFile(designer.current.getTemplate(), 'template');
      console.log(designer.current.getTemplate());
    }
  };

  const onSaveTemplate = (template?: Template) => {
    if (designer.current) {
      localStorage.setItem('template', JSON.stringify(template || designer.current.getTemplate()));
      alert('Saved!');
    }
  };

  const onChangeTemplatePresets = (e: SelectChangeEvent) => {
    setTemplatePreset(e.target.value);
    localStorage.setItem('template', JSON.stringify(getTemplateByPreset(localStorage.getItem('templatePreset') || '')));
    localStorage.removeItem('template');
    localStorage.setItem('templatePreset', e.target.value);
    buildDesigner();
  };

  useEffect(() => {
    buildDesigner();
    return () => {
      designer.current?.destroy();
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
              if (designer.current) {
                designer.current.updateOptions({ lang: e.target.value as Lang });
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

        <FormControl size="small">
          <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
            Upload BasePDF
            <VisuallyHiddenInput type="file" accept="application/pdf" onChange={onChangeBasePDF} />
          </Button>
        </FormControl>

        <FormControl size="small">
          <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
            Upload Template
            <VisuallyHiddenInput
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                handleLoadTemplate(e as React.ChangeEvent<HTMLInputElement>, designer.current);
                setTemplatePreset(customTemplatePresetKey);
              }}
            />
          </Button>
        </FormControl>

        <FormControl size="small">
          <Button variant="outlined" onClick={onDownloadTemplate}>
            Download Template
          </Button>
        </FormControl>

        <FormControl size="small">
          <Button variant="outlined" onClick={() => onSaveTemplate()}>
            Save Template
          </Button>
        </FormControl>

        <FormControl size="small">
          <Button variant="outlined" onClick={() => generatePDF(designer.current)}>
            Generate PDF
          </Button>
        </FormControl>
      </Box>
      <div ref={designerRef} style={{ width: '100%', height: `calc(100% - 40px)` }} />
    </div>
  );
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
