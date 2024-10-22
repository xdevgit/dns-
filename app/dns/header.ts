export enum OpCode{
    STANDERD_QUERY=0,
}
export enum responseCode{
    NO_ERROR = 0,
    FORMAT_ERROR = 1,

}
export interface TDNSHeader{
 id:number,
 qr:number,
 opCode:OpCode,
 aa:number,
 tcCode:number,
 RDcode:number,
 RAcode:number,
 Z:number,
 rCode: responseCode,
 qdCount:number,
 anCount:number,
 nsCount:number,
 arCount:number,
}

// +---------------------+
// |        Header       | (The header section is always 12 bytes long. Integers are encoded in big-endian format.) 
// +---------------------+
// |       Question      | the question for the name server
// +---------------------+
// |        Answer       | RRs answering the question
// +---------------------+
// |      Authority      | RRs pointing toward an authority
// +---------------------+
// |      Additional     | RRs holding additional information
// +---------------------+
class DNSHeader{
    static write(values: TDNSHeader){
        const header= Buffer.alloc(12);
        const flags=
        values.qr|
         values.opCode| 
         values.aa|
          values.tcCode|
           values.RDcode|
            values.RAcode|
             values.Z|
             values.rCode;
        header.writeInt16BE(values.id , 0)
        header.writeInt16BE(flags,2);
        header.writeInt16BE(values.qdCount,4);
        header.writeInt16BE(values.anCount,6);
        header.writeInt16BE(values.nsCount,8);
        header.writeInt16BE(values.arCount,10);

return header;
    }
}
export default DNSHeader;