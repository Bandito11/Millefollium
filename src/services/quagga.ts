import Quagga, { QuaggaJSResultObject } from "@ericblade/quagga2";

export function scan(target): Promise<QuaggaJSResultObject> {
  return new Promise((resolve, reject) => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: target,
      },
      decoder: {
        readers: ['ean_reader']
      }
    }, function (error) {
      if (error) {
        reject(error);
        return
      }
      console.log('Initialization finished. Ready to start');
      Quagga.start();
    });
    Quagga.onDetected(data => resolve(data));
  });
}

export function stopScan() {
  Quagga.stop();
  return '';
};