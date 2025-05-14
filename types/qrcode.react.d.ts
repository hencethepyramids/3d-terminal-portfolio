declare module 'qrcode.react' {
  interface QRCodeSVGProps {
    value: string;
    size?: number;
    level?: 'L' | 'M' | 'Q' | 'H';
    bgColor?: string;
    fgColor?: string;
  }

  export class QRCodeSVG {
    constructor(props: QRCodeSVGProps);
    toString(): string;
  }
} 