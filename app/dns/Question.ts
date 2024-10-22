export enum DNSType {
  A = 1,
  NS = 2,
}

export enum DNSClass {
  IN = 1,
}

export interface IDNSQuestions {
  name: string;
  type: DNSType;
  classCode: DNSClass;
}

class DNSQuestion {
  static write(question: IDNSQuestions[]) {
  
    return Buffer.concat(
          //@ts-ignore
      question.map(({ name, type, classCode }) => {
        const str = name
          .split(".")
          .map((n) => `${String.fromCharCode(n.length)}${n}`)
          .join("");
        const typeAndClass = Buffer.alloc(4);
        typeAndClass.writeInt16BE(type, 0);
        typeAndClass.writeInt16BE(classCode, 2);
          //@ts-ignore
        return Buffer.concat([Buffer.from(str + '\0', 'binary'), typeAndClass]);
      })
    );
  }
}

export default DNSQuestion;
