import { checkTemplate, getInputFromTemplate, Template } from '@pdfme/common';
import { Form as PdfMeForm, Viewer as PdfMeViewer } from '@pdfme/ui';
import { useEffect, useRef, useState } from 'react';
import { generatePDF, getFontsData, getPlugins, getTemplateByPreset, handleLoadTemplate, isJsonString } from '../helper';

import { FileInputFormControl } from '@/components/molecules';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import './styles.css';

type Mode = 'form' | 'viewer';

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

export const PdfForm = () => {
  const uiRef = useRef<HTMLDivElement | null>(null);
  const ui = useRef<PdfMeForm | PdfMeViewer | null>(null);

  const [mode, setMode] = useState<Mode>((localStorage.getItem('mode') as Mode) ?? 'form');

  const buildUi = (mode: Mode) => {
    const template = initTemplate();
    let inputs = getInputFromTemplate(template);
    try {
      const inputsString = localStorage.getItem('inputs');
      if (inputsString) {
        const inputsJson = JSON.parse(inputsString);
        inputs = inputsJson;
      }
    } catch {
      localStorage.removeItem('inputs');
    }

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
    localStorage.setItem('mode', value);
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
        const json = isJsonString(prompt) ? JSON.parse(prompt) : [{}];
        ui.current.setInputs(json);
      } catch (e) {
        alert(e);
      }
    }
  };

  const onSaveInputs = () => {
    if (ui.current) {
      const inputs = ui.current.getInputs();
      localStorage.setItem('inputs', JSON.stringify(inputs));
      alert('Saved!');
    }
  };

  const onResetInputs = () => {
    localStorage.removeItem('inputs');
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
          <RadioGroup defaultValue="form" row onChange={onChangeMode}>
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
          <Button variant="outlined" onClick={onSaveInputs}>
            Save Inputs
          </Button>
        </FormControl>

        <FormControl size="small">
          <Button variant="outlined" onClick={onResetInputs} color="warning">
            Reset Inputs
          </Button>
        </FormControl>

        <FormControl size="small">
          <Button variant="outlined" onClick={() => generatePDF(ui.current)} color="success">
            Generate PDF
          </Button>
        </FormControl>
      </Box>
      <div ref={uiRef} className="pdf-form-container" />
    </div>
  );
};
