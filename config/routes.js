export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BlankLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/statistics/general-statistics',
              },         
              {
                path: '/statistics',
                name: 'statistics',
                icon: 'table',
                routes: [
                  {
                    name: 'general-statistics',
                    path: '/statistics/general-statistics',
                    component: './Statistics/GeneralStatistics',
                  },
                  {
                    name: 'cooperation-statistics',
                    path: '/statistics/user-statistics',
                    component: './Statistics/UserStatistics',
                  },
                  {
                    name: 'emotional-statistics',
                    path: '/statistics/emotional-statistics',
                    component: './Statistics/GoodsStatistics',
                  },
                ],               
              }, 
              {
                path: '/queries',
                name: 'queries',
                icon: 'dashboard',
                routes: [
                  {
                    name: 'search-by-name',
                    path: '/queries/search-by-name',
                    component: './Queries/SearchByName',
                  },
                  {
                    name: 'movie-length',
                    path: '/queries/movie-length',
                    component: './Statistics/GeneralStatistics',
                  },
                  {
                    name: 'publish-time',
                    path: '/queries/publish-time',
                    component: './Statistics/GeneralStatistics',
                  },                                    
                  {
                    name: 'user-review',
                    path: '/queries/user-review',
                    component: './Statistics/GoodsStatistics',
                  },
                  {
                    name: 'comment-user',
                    path: '/queries/comment-user',
                    component: './Statistics/GoodsStatistics',
                  },
                  {
                    name: 'composition',
                    path: '/queries/composition',
                    component: './Statistics/GoodsStatistics',
                  },                                    
                ],               
              },                                                                       
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
