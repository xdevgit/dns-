import { DNSClass, DNSType } from './Question';

export interface IDNSAnswer {
  name: string,
  type: DNSType,
  className: DNSClass,
  ttl: number,
  data: string,
}

class DNSAnswer {
  static write(answers: IDNSAnswer[]) {
    //@ts-ignore
    return Buffer.concat(answers.map((ans) => {
      const { name, type, className, ttl, data } = ans;

      // Convert the domain name into DNS format (length-prefixed labels)
      const str = name.split(".").map((e) => `${String.fromCharCode(e.length)}${e}`).join("");

      // Allocate buffer for type, className, ttl, and data length
      const buffer = Buffer.alloc(10);
      buffer.writeUInt16BE(type, 0); // 2 bytes for type
      buffer.writeUInt16BE(className, 2); // 2 bytes for class
      buffer.writeUInt32BE(ttl, 4); // 4 bytes for ttl (32-bit unsigned integer)
      buffer.writeUInt16BE(data.length, 8); // 2 bytes for data length

      // Concatenate buffers for name, type/class/ttl/data length, and data itself
      //@ts-ignore
      return Buffer.concat([
        Buffer.from(str + "\0", 'utf8'), // Domain name buffer
        buffer, // Type, class, ttl, and data length
        Buffer.from(data + "\0", 'utf8'), // Actual data buffer
      ] as Buffer[]); // Explicit type assertion to ensure the array is Buffer[]
    }));
  }
}

export default DNSAnswer;
