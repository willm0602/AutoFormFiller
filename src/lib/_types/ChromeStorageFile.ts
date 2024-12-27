interface ChromeStorageFile {
    fileName: string;
    mimeType: string;
    contents: string | ArrayBuffer;
}

export default ChromeStorageFile;
