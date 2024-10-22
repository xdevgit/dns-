import * as dgram from "dgram";
  //@ts-ignore
import DNSHeader, { TDNSHeader, responseCode ,OpCode} from './dns/header';
import DNSQuestion, { DNSClass, DNSType, type IDNSQuestions } from "./dns/Question";
import type { IDNSAnswer } from "./dns/answer";
import DNSAnswer from "./dns/answer";
const defaultHeader: TDNSHeader={
    id:123,
    qr:1 << 15,
    opCode: OpCode.STANDERD_QUERY,
    aa:0,
    tcCode:0,
    RDcode:0,
    RAcode:0,
    Z:0,
    rCode:responseCode.NO_ERROR,
    qdCount:0,
    anCount:0,
    nsCount:0,
    arCount:0,


};

const defaultQusetion : IDNSQuestions={
    name : 'codecrafters.io',
    classCode:DNSClass.IN,
    type:DNSType.A

}
const defaultAnswer: IDNSAnswer={
    name:'codecfrafter.io',
    className : DNSClass.IN,
    type:DNSType.A,
    ttl:60,
    data:"\x08\x08\x08\x08"
}
const udpSocket: dgram.Socket = dgram.createSocket("udp6");
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
      const header =DNSHeader.write({...defaultHeader, qdCount:1 , anCount:1});
       const question =DNSQuestion.write([defaultQusetion])
       const answer =DNSAnswer.write([defaultAnswer])
//@ts-ignore
        const response =new Uint8Array([header, question,answer]);
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
