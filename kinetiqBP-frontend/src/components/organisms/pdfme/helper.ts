import { checkTemplate, DEFAULT_FONT_NAME, Font, getDefaultFont, getInputFromTemplate, Template } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import {
  barcodes,
  checkbox,
  date,
  dateTime,
  ellipse,
  image,
  line,
  multiVariableText,
  radioGroup,
  rectangle,
  select,
  svg,
  table,
  text,
  time,
} from '@pdfme/schemas';
import { Designer, Form, Viewer } from '@pdfme/ui';
import React from 'react';
import plugins from './plugins';
import { getBlankTemplate, getInvoiceTemplate } from './template';

interface FontObj {
  fallback: boolean;
  label: string;
  data: ArrayBuffer | string | Uint8Array;
  url?: string;
}

const fontObjList: FontObj[] = [
  {
    fallback: true,
    label: DEFAULT_FONT_NAME,
    data: getDefaultFont()[DEFAULT_FONT_NAME].data,
  },
];

export const getFontsData = async () => {
  const fontDataList = (await Promise.all(
    fontObjList.map(async (font) => ({
      ...font,
      data: font.data ?? (await fetch(font.url ?? '').then((res) => res.arrayBuffer())),
    })),
  )) as { fallback: boolean; label: string; data: ArrayBuffer }[];

  return fontDataList.reduce((acc, font) => ({ ...acc, [font.label]: font }), {} as Font);
};

export const readFile = (file: File | null, type: 'text' | 'dataURL' | 'arrayBuffer') => {
  return new Promise<string | ArrayBuffer>((r) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', (e) => {
      if (e && e.target && e.target.result && file !== null) {
        r(e.target.result);
      }
    });
    if (file !== null) {
      if (type === 'text') {
        fileReader.readAsText(file);
      } else if (type === 'dataURL') {
        fileReader.readAsDataURL(file);
      } else if (type === 'arrayBuffer') {
        fileReader.readAsArrayBuffer(file);
      }
    }
  });
};

const getTemplateFromJsonFile = (file: File) => {
  return readFile(file, 'text').then((jsonStr) => {
    const template: Template = JSON.parse(jsonStr as string);
    checkTemplate(template);
    return template;
  });
};

export const downloadJsonFile = (json: unknown, title: string) => {
  if (typeof window !== 'undefined') {
    const blob = new Blob([JSON.stringify(json)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
};

export const handleLoadTemplate = (e: React.ChangeEvent<HTMLInputElement>, currentRef: Designer | Form | Viewer | null) => {
  if (e.target && e.target.files) {
    getTemplateFromJsonFile(e.target.files[0])
      .then((t) => {
        if (!currentRef) return;
        currentRef.updateTemplate(t);
      })
      .catch((e) => {
        alert(`Invalid template file.${e}`);
      });
  }
};

export const getPlugins = () => {
  return {
    Text: text,
    'Multi-Variable Text': multiVariableText,
    Table: table,
    Line: line,
    Rectangle: rectangle,
    Ellipse: ellipse,
    Image: image,
    SVG: svg,
    Signature: plugins.signature,
    QR: barcodes.qrcode,
    DateTime: dateTime,
    Date: date,
    Time: time,
    Select: select,
    Checkbox: checkbox,
    RadioGroup: radioGroup,
    // JAPANPOST: barcodes.japanpost,
    EAN13: barcodes.ean13,
    // EAN8: barcodes.ean8,
    // Code39: barcodes.code39,
    Code128: barcodes.code128,
    // NW7: barcodes.nw7,
    // ITF14: barcodes.itf14,
    // UPCA: barcodes.upca,
    // UPCE: barcodes.upce,
    // GS1DataMatrix: barcodes.gs1datamatrix,
  };
};

export const translations: { label: string; value: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ko', label: 'Korean' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ar', label: 'Arabic' },
  { value: 'th', label: 'Thai' },
  { value: 'pl', label: 'Polish' },
  { value: 'it', label: 'Italian' },
  { value: 'de', label: 'German' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
];

export const generatePDF = async (currentRef: Designer | Form | Viewer | null) => {
  if (!currentRef) return;
  const template = currentRef.getTemplate();
  const options = currentRef.getOptions();
  const inputs =
    typeof (currentRef as Viewer | Form).getInputs === 'function' ? (currentRef as Viewer | Form).getInputs() : getInputFromTemplate(template);
  const font = await getFontsData();

  try {
    const pdf = await generate({
      template,
      inputs,
      options: {
        font,
        lang: options.lang,
        title: 'pdfme',
      },
      plugins: getPlugins(),
    });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
  } catch (e) {
    alert(e + '\n\nCheck the console for full stack trace');
    throw e;
  }
};

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

export const getTemplatePresets = (): {
  key: string;
  label: string;
  template: () => Template;
}[] => [
  { key: 'blank', label: 'Blank', template: getBlankTemplate },
  { key: 'invoice', label: 'Invoice', template: getInvoiceTemplate },
  { key: 'custom', label: 'Custom', template: getBlankTemplate },
];

export const getTemplateByPreset = (templatePreset: string): Template => {
  const templatePresets = getTemplatePresets();
  const preset = templatePresets.find((preset) => preset.key === templatePreset);
  return preset ? preset.template() : templatePresets[0].template();
};
