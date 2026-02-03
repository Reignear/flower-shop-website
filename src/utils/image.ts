export const ImagePreview = (file: File | null | string): string => {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  if (typeof file === "string") {
    return file;
  }
  return "";
};

export const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: (file: File | null) => void,
) => {
  const selectedFile = e.target.files?.[0] ?? null;
  setImage(selectedFile);
};
