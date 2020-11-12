export function sayHello() {
  return Math.random() < 0.5 ? 'Hello' : 'Hola';
}
export function base64ToURL(data) {
  try {
      if (typeof data === 'object') {
          return URL.createObjectURL(data);
      }
      const byteCharacters = atob(data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, { type: 'image/png' });
      return URL.createObjectURL(blob);
  } catch (error) {
      return data;
  }
}
