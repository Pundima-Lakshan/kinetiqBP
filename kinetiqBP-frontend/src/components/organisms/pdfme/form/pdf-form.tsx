import { checkTemplate, getInputFromTemplate, Template } from '@pdfme/common';
import { Form as PdfMeForm, Viewer as PdfMeViewer } from '@pdfme/ui';
import { useEffect, useRef, useState } from 'react';
import { downloadPDF, getFontsData, getPlugins, getTemplateByPreset, handleLoadTemplate, isJsonString } from '../helper';

import { FileInputFormControl } from '@/components/molecules';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import './styles.css';

/*
editor type is only for tempory type safety
*/
type Mode = 'form' | 'viewer' | 'editor';

const initTemplate = () => {
  let template: Template = getTemplateByPreset(localStorage.getItem('templatePreset') || '');
  try {
    const templateString = localStorage.getItem('template');
    if (!templateString) {
      return template;
    }
    const templateJson = JSON.parse(templateString);
    checkTemplate(templateJson);
    template = templateJson as Template;
  } catch {
    localStorage.removeItem('template');
  }
  return template;
};

interface PdfFormProps {
  initialMode?: Mode | undefined;
  initialTemplate?: Template;
  initialInputs?: Record<string, string>[];
}

export const PdfForm = ({ initialMode, initialTemplate, initialInputs }: PdfFormProps) => {
  const uiRef = useRef<HTMLDivElement | null>(null);
  const ui = useRef<PdfMeForm | PdfMeViewer | null>(null);

  const [mode, setMode] = useState<Mode>(initialMode ?? 'viewer');

  const buildUi = (mode: Mode) => {
    const template = initialTemplate ?? initTemplate();
    let inputs = initialInputs ?? getInputFromTemplate(template);

    getFontsData().then((font) => {
      if (uiRef.current) {
        ui.current = new (mode === 'form' ? PdfMeForm : PdfMeViewer)({
          domContainer: uiRef.current,
          template,
          inputs,
          options: {
            font,
            lang: 'en',
            labels: { clear: 'clear' },
            theme: {
              token: {
                colorPrimary: '#25c2a0',
              },
            },
          },
          plugins: getPlugins(),
        });
      }
    });
  };

  const onChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Mode;
    setMode(value);
    buildUi(value);
  };

  const onGetInputs = () => {
    if (ui.current) {
      const inputs = ui.current.getInputs();
      alert(JSON.stringify(inputs, null, 2));
      alert('Dumped as console.log');
      console.log(inputs);
    }
  };

  const onSetInputs = () => {
    if (ui.current) {
      const prompt = window.prompt('Enter Inputs JSONString') || '';
      try {
        const json = !!isJsonString(prompt) ? JSON.parse(prompt) : [{}];
        ui.current.setInputs(json);
      } catch (e) {
        alert(e);
      }
    }
  };

  const onResetInputs = () => {
    if (ui.current) {
      const template = initTemplate();
      ui.current.setInputs(getInputFromTemplate(template));
    }
  };

  useEffect(() => {
    if (!ui.current) {
      buildUi(mode);
    }
    return () => {
      ui.current?.destroy();
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
        <FormControl size="small">
          <RadioGroup defaultValue={mode} row onChange={onChangeMode}>
            <FormControlLabel value="form" control={<Radio />} label="Form" />
            <FormControlLabel value="viewer" control={<Radio />} label="Viewer" />
          </RadioGroup>
        </FormControl>

        <FileInputFormControl handleChange={(e) => handleLoadTemplate(e, ui.current)} label="Load Template" />

        <FormControl size="small">
          <Button variant="outlined" onClick={onGetInputs}>
            Get Inputs
          </Button>
        </FormControl>

        <FormControl size="small">
          <Button variant="outlined" onClick={onSetInputs}>
            Set Inputs
          </Button>
        </FormControl>

        <FormControl size="small">
          <Button variant="outlined" onClick={onResetInputs} color="warning">
            Reset Inputs
          </Button>
        </FormControl>

        <FormControl size="small">
          <Button variant="outlined" onClick={() => downloadPDF(ui.current)} color="success">
            Generate PDF
          </Button>
        </FormControl>
      </Box>
      <div ref={uiRef} className="pdf-form-container" />
    </div>
  );
};
