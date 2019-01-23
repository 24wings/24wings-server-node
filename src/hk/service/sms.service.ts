// let enpoint = `http://1770567526081147.mns.cn-hangzhou.aliyuncs.com/`;
const accessKeyId = "LTAInnWSTiXd9324";
const secretAccessKey = "Wcl8YaQssY2596NjMc10thFxjzz4T0";
import SMSClient = require("@alicloud/sms-sdk");
import { Injectable } from "@nestjs/common";
import { DateService } from "./date.service";



let smsClient = new SMSClient({ accessKeyId, secretAccessKey });

@Injectable()
export class SmsService {
    constructor(private dateService: DateService) { }
    async sendSms(PhoneNumbers: string, SignName: string, TemplateCode: string, TemplateParam) {
        try {
            return smsClient.sendSMS({ PhoneNumbers, SignName, TemplateCode, TemplateParam });
        } catch (e) {
            if (e) throw new Error('短信频率过高')
        }
    }

    querySendDetails(PhoneNumber: string) {
        return smsClient.queryDetail({ PhoneNumber, PageSize: '10', CurrentPage: '1', SendDate: this.dateService.format(new Date(), 'yyyyMMdd'), });
    }

    async verifyAuthcode(mobile: string, authcode: string) {
        let codes = await this.querySendDetails(mobile);
        if (!codes.SmsSendDetailDTOs.SmsSendDetailDTO[0]) {
            return { ok: false, msg: '请先发送验证码' };
        } else {
            let sendDt = new Date(codes.SmsSendDetailDTOs.SmsSendDetailDTO[0].SendDate);
            let limitTime = new Date(sendDt.getTime() + 3 * 60 * 1000);
            if (limitTime.getTime() < Date.now()) {
                return { ok: false, msg: '验证码已过期' }
            }

            let verify = new RegExp(authcode).test(codes.SmsSendDetailDTOs.SmsSendDetailDTO[0].Content);
            if (authcode) {
                if (!verify || authcode.length > 4 || authcode.length < 4) {
                    // return this.ctx.body = err(400, '验证码错误');
                    return { ok: false, msg: '验证码错误' }
                }
            } else {
                return { ok: false, msg: '验证码错误' }
            }
        }
        return { ok: true }
    }

    async getLastMsg(mobile: string) {
        let codes = await this.querySendDetails(mobile);

        return codes.SmsSendDetailDTOs.SmsSendDetailDTO[0]

    }

    memberVerifySms(mobile: string) {
        return this.sendSms(mobile, "团游寰宇", "SMS_152549923", JSON.stringify({}));
    }

    productNotifySms(mobile: string, productName) {
        return this.sendSms(mobile, "团游寰宇", "SMS_152513855", JSON.stringify({ productName }))
    }

}
