const Validates: (intl: any) => any =
	(intl: any): any => {
		return {
			required: {
				required: true,
				pattern: /^(?!\s*$).+/,
				message: intl.formatMessage({ id: "global.validate.notNull" })
			},  //必填
			username: { type: 'string', message: intl.formatMessage({ id: "global.validate.username" }) }, //用户名占位
			loginname: {
				pattern: /^[a-zA-Z_][a-z0-9A-Z_]*$/,
				message: intl.formatMessage({ id: "global.validate.input.login" })
			},
			mail: {
				pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
				message: intl.formatMessage({ id: "global.validate.input.mail" })
			},                                                                                    //邮箱
			phone: {
				// pattern:/^([\+]\d{2,3}-)(\d{11})$/,
				pattern: /^[0-9+-]{0,20}$/,
				message: intl.formatMessage({ id: "global.validate.input.phoneNum" })
			},                                                                                    //手机号码
			mobile: {
				pattern: /^[0-9+-]{0,20}$/,
				message: intl.formatMessage({ id: "global.validate.input.mobileNum" })
			},                                                                                     //座机号码
			url: {  //URL
				pattern: /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/,
				message: intl.formatMessage({ id: "global.validate.url" })
			},
			url2: { //URL上带端口号的情况
				pattern: /^(http|ftp|https):\/\/([\w-]+\.)+[\w-]+(:[0-9]{1,6})?(\/[\w-./?%&=]*)?$/,
				message: intl.formatMessage({ id: "global.validate.url" })
			},
			illegalCharacter: {
				pattern: /^[0-9A-Za-z_]*$/,
				message: intl.formatMessage({ id: "global.validate.illegalCharacter" })
			},
			cannotContain: (characters: string): any => {
				if (!characters) characters = "%&#~^+|\/><`*',;=?!$"
				var regx: RegExp = new RegExp(`^[^${characters}\x22]+$`);
				return {
					pattern: regx,
					message: intl.formatMessage({ id: "global.validate.cannotContain" }, { characters: characters })
				}
			},

			string: { type: 'string', message: intl.formatMessage({ id: "global.validate.string" }) },      //字符串
			number: { type: 'number', message: intl.formatMessage({ id: "global.validate.number" }) },      //数字
			integer: { type: 'integer', message: intl.formatMessage({ id: "global.validate.integer" }) },   //整数
			float: { type: 'float', message: intl.formatMessage({ id: "global.validate.float" }) },         //浮点数
			boolean: { type: 'float', message: intl.formatMessage({ id: "global.validate.boolean" }) },     //布尔型
			object: { type: 'object', message: intl.formatMessage({ id: "global.validate.object" }) },      //对象
			array: { type: 'array', message: intl.formatMessage({ id: "global.validate.array" }) },         //数组
			date: { type: 'date', message: intl.formatMessage({ id: "global.validate.date" }) },            //日期
			postalCode: {
				pattern: /^[1-9]\d{5}$/,
				message: intl.formatMessage({ id: 'global.validate.postalCodeForSix' })
			},
			//枚举类型,传入一个枚举数组
			enum: (arr: any[]): any => {
				if (!arr) arr = []
				return {
					type: 'enum',
					enum: arr,
					message:
						intl.formatMessage(
							{ id: "global.validate.enum" }, { value: JSON.stringify(arr) }
						)
				}
			},
			len: (num: number): any => {
				return {
					len: num,
					message: intl.formatMessage({ id: "global.validate.len", value: num }, { value: num })
				}    //长度，传入一个number
			},
			max: (num: number): any => {
				return { max: num, message: intl.formatMessage({ id: "global.validate.max", value: num }, { value: num }) }     // 最大长度，传入一个number
			},
			min: (num: number): any => {
				return { min: num, message: intl.formatMessage({ id: "global.validate.min", value: num }, { value: num }) }     // 最小长度，传入一个number
			},
			validator: (validator: any): any => {
				return { validator: validator }   //自定义校验
			}

		}
	}

export default Validates
