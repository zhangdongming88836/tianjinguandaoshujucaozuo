import permissionCode from '../../utils/permission'
import'../../styles/iconfont.scss';
const _import = require('../_import_' + process.env.NODE_ENV)

export default [
   {
        path: '/',
        component:_import('project/index'),
        name: '',
        funccode:'',
        redirect:'home',
        meta: { title: ''},
        children:[
        	{
        		path: '/home',
		        component:_import('project/home/index'),
		        name: 'home',
		        funccode:'',
		        meta: { title: '首页', icon:'icon-icon_home'},
        	},
        	{
        		path: '/ProjectDocumentManagement',
		        component:_import('project/ProjectDocumentManagement/index'),
		        name: 'ProjectDocumentManagement',
		        funccode:'',
		        meta: { title: '工程文档管理', icon:'icon-icon_document'},
        	},
        	{
        		path: '/EngineeringDataManagement',
		        component:_import('project/EngineeringDataManagement/index'),
		        name: 'EngineeringDataManagement',
		        funccode:'',
		        meta: { title: '工程数据管理', icon:'icon-icon_date2'},
        	},
        	{
        		path: '/QueryAndStatistics',
		        component:_import('project/QueryAndStatistics/index'),
		        name: 'QueryAndStatistics',
		        funccode:'',
		        meta: { title: '查询与统计', icon:'icon-icon_date1'},
        	},
        	{
        		path: '/BasicInformationManagement',
		        component:_import('project/BasicInformationManagement/index'),
		        name: 'BasicInformationManagement',
		        funccode:'',
		        meta: { title: '基础信息管理', icon:'icon-icon_information'},
				children:[
			      {
					path: 'projectManagement',
					component:_import('project/BasicInformationManagement/projectManagement/index'),
					name: 'projectManagement',
					funccode:'',
					meta: { title: '项目管理', icon:''},
				  },
			      {
					path: 'hotspot',
					component:_import('project/BasicInformationManagement/hotspot/index'),
					name: 'hotspot',
					funccode:'',
					meta: { title: '热点', icon:''},
				  },
			      {
					path: 'systemLog',
					component:_import('project/BasicInformationManagement/systemLog/index'),
					name: 'systemLog',
					funccode:'',
					meta: { title: '系统日志', icon:''},
				  },
				]
        	}
        ]
    }
]
