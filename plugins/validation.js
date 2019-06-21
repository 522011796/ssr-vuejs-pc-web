import Vue from 'vue'
/**
 * 以下为开发的vue插件
 *
 * 参数 item
 * required true  必填项
 * maxLength  字符串的最大长度
 * min 和 max 必须同时给 min < max  type=number
 * type 手机号 mobile
 *      邮箱   email
 *      网址   url
 *      持续添加中.......
 **/
var Validation = {};
Vue.prototype.$filter_rules = function(item){
    let rules = [];
    if(item.required && item.type !== 'array'){
        rules.push({ required: true, message: this.$t('lang.inputRightTips'), trigger: 'blur' });
    }
    if(item.maxLength){
        rules.push({ min:1,max:item.maxLength, message: this.$t('lang.inputMax')+item.maxLength+this.$t('lang.strNum'), trigger: 'blur' })
    }
    if(item.min&&item.max){
        rules.push({ min:item.min,max:item.max, message: this.$t('lang.strLeng')+item.min+this.$t('lang.to')+item.max+this.$t('lang.between'), trigger: 'blur' })
    }
    if(item.type) {
        let type = item.type;
        switch (type) {
            case 'email':
                rules.push({type: 'email', message: this.$t('lang.inputRightMail'), trigger: 'blur'});
                break;
            case 'checkboxArray':
                rules.push({required: true, type: 'array',min:1, message: this.$t('lang.selCheckbox'), trigger: 'change'});
                break;
            case 'array':
                rules.push({required: true, type: 'array',min:1, message: this.$t('lang.arrayTips'), trigger: 'change'});
                break;
            case 'phone':
                rules.push({pattern: /^1[34578]\d{9}$/, message: this.$t('lang.inputRightPhone'), trigger: 'blur'});
                break;
            case 'card':
                rules.push({
                    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    message: this.$t('lang.inputRightCardId'),
                    trigger: 'blur'
                });
                break;
            case 'num':
                rules.push({pattern: /^[1-9]\d*$/, message: this.$t('lang.inputNotZero'), trigger: 'blur'});
                break;
            case 'float2':
                rules.push({
                    pattern: /^([1-9]+[0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]?|0\.0[1-9])$/,
                    message: this.$t('lang.inputTwoNum'),
                    trigger: 'blur'
                });
                break;
            case 'pwd':
                rules.push({pattern: /^[^\u4e00-\u9fa5\s]{6,20}$/, message: this.$t('lang.inputSixtotwnty'), trigger: 'blur'});
                break;
            case 'mac':
                rules.push({
                    pattern: /^[A-F0-9]{2}(-[A-F0-9]{2}){5}$|^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/,
                    message: this.$t('lang.inputRightMac'),
                    trigger: 'blur'
                });
                break;
            case 'ip':
                rules.push({
                    pattern: /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    message: this.$t('lang.inputRightIp'),
                    trigger: 'blur'
                });
                break;
            default:
                rule.push({});
                break;
        }
    }
    return rules;
}
