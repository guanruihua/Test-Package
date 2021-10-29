import { iRouter } from "@/assets/type"

// 判断路径出现id的情况[:id]
// /serviceInfo/function/:id
// /serviceInfo/function/123
// /serviceInfo/function/:id/subFunction/:cid
// /serviceInfo/function/123/subFunction/456
let link: string = '';

const equalPath: any = (url: string, path: string): boolean => {
	link = '';
	if (url === path) return true;
	let urlItems: string[] = url.split('/').filter(v => v)
	let pathItems: string[] = path.split('/').filter(v => v)

	for (let i: number = 0, len: number = pathItems.length; i < len; i++) {

		if (urlItems[i] === pathItems[i]
			|| String(pathItems[i]).indexOf(':') > -1
		) {
			link += '/' + urlItems[i];
			if (i === len - 1) return true;
			continue;
		} else return false;
	}
	return false;
}


export const findURLtoPath =
	(list: iRouter[], url: string): iRouter[] => {
		const result: iRouter[] = []
		const ids: string[] = []

		const findPath = (list: iRouter[]) => {
			list.map((item: iRouter) => {
				const { children, ...rest } = item;
				if (ids.includes(item.id)) return;
				if (equalPath(url, rest.path)) {
					rest.path = link;
					result.push(rest)
					ids.push(rest.id)
				}

				if (equalPath(url, rest.path) && children && children.length > 0) {
					findPath(children)
				}
			})
		}
		findPath(list)

		return result;
	}