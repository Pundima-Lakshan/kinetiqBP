import { type DefaultError } from "@tanstack/react-query";

export type BaseRestResponse<T = unknown> = T;

export const defaultSelect = <T>(data: BaseRestResponse<T>) => data;

export interface BaseRestResponseDefaultError<T = unknown>
  extends DefaultError {
  content: BaseRestResponse<T>;
  status: number;
  statusText: string;
}

export const downloadFile = (response: BlobPart, filenamePrefix: string) => {
  const blob = new Blob([response]);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  const filename = `${filenamePrefix}_${formattedDate}.xlsx`;
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
