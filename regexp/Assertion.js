import { logGroup } from 'rh-js-methods'
import { test, expect } from 'rh-test'

function tests(name, ...args) {
	return test(name, ...args.map(it => expect(it[0].match(it[1])).tobe(it[2])))
}

tests('Assertion',
	['1234123', /123/, ['123']],
	['1234123', /123/, ['123']],
	['12341235', /23/g, ['23','23'] ],
	['12341235', /23(?=4)/, ['23'] ],
	['12341235', /23(?=5)/, ['23'] ],
	['12341235', /23(?!5)/, ['23'] ],
	['a regular expression', /re(gular)/, ['regular', 'gular']],
	['a regular expression', /re(?=gular)/, ['re']],
	['a regular expression', /re(?=gular)./g, ['reg']],
	['regex represents regular expression', /re(?!g)/g, ['re','re','re']],
	['regex represents regular expression', /(?<=\w)re/g, ['re','re']],
	['regex represents regular expression', /(?<!\w)re/g, ['re','re', 're']],
)
