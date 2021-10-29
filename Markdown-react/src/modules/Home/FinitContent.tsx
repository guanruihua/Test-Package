import React, { FC } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { ARLangSelect } from '@/components';
import { Route, Switch, withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb } from 'antd';
import { Library } from '@/assets';
import { routers } from '@/router';
import { iRouter } from '@/assets/type';
import { Link } from 'react-router-dom';
import { findURLtoPath } from './utils';

interface iBreadcrumb {
	key: string;
	path: string;
	title: string;
}
/**
 * 首页头部
 */
const FinitContentHeader = withRouter((props: any) => {
	const { history } = props;
	const pathname: string = props.location.pathname || '/';
	const [breadcrumbList, setBreadcrumbList] = React.useState([])

	/* 监听url 的变化修改面包屑 start */
	React.useEffect(() => {
		Library.routeGuard(history);
		setBreadcrumbList(findURLtoPath(routers, pathname))
	}, [pathname])
	/* 监听url 的变化修改面包屑 end */

	return (
		<div className="home-content-main-header">
			<Breadcrumb>
				<Breadcrumb.Item>
					<Link to="/home"> <FormattedMessage id={'menu.name._menu_home'} /></Link>
				</Breadcrumb.Item>
				{breadcrumbList.map((item: iBreadcrumb) => {
					const { key, path, title } = item;
					if (title !== 'menu.name._menu_home') {
						return (
							<Breadcrumb.Item key={key}>
								<Link to={path} onClick={(e: any): void => {
									!path && e.preventDefault();
								}}>{title && <FormattedMessage id={title} />}</Link>
							</Breadcrumb.Item>
						)
					}
				})}
			</Breadcrumb>
			<ARLangSelect />
		</div>
	)
})

/**
 * 首页主体
 * 挂载头部, 以及注册首页下的子路由
 *  */
const FinitContent = (props: any) => {
	const buildRouteTree: any = (list: iRouter[]): any => {
		return (
			list?.length > 0
			&& list.map((item: iRouter): any => {
				const { key, id, path, exact = false, module, loadRoute = true, children = [] } = item;
				if (!loadRoute) return;
				if (children?.length > 0) {
					if (module) children.push({ key, path, id, exact, module })
					return buildRouteTree(children);
				}
				return (
					<Route
						exact={exact}
						key={key}
						path={path}
						component={module}
					/>
				)
			})
		)
	}
	return (
		<div className="home-content-main">
			<FinitContentHeader />
			<Scrollbars className="home-content">
				<Switch>
					{buildRouteTree(routers)}
				</Switch>
				<div className="home-content-space" />
			</Scrollbars>
		</div>
	)
}

export default FinitContent;