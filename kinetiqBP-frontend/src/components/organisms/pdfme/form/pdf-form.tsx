import { checkTemplate, getInputFromTemplate, Template } from '@pdfme/common';
import { Form as PdfMeForm, Viewer as PdfMeViewer } from '@pdfme/ui';
import { useRef, useState, type MutableRefObject } from 'react';
import { getFontsData, getPlugins, getTemplateByPreset, isJsonString } from '../helper';

import './style.css';

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
  const [prevUiRef, setPrevUiRef] = useState<MutableRefObject<HTMLDivElement | null> | null>(null);

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

  if (uiRef != prevUiRef) {
    if (prevUiRef && ui.current) {
      ui.current.destroy();
    }
    buildUi(mode);
    setPrevUiRef(uiRef);
  }

  const [s, setS] = useState(true);

  return (
    <div>
      <button
        onClick={() => {
          setS((prev) => !prev);
        }}
      >
        C
      </button>
      <div ref={uiRef} className="pdf-form-container" style={{ display: s ? 'block' : 'none' }} />
    </div>
  );
};
