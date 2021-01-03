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
                    name: 'emotional-statistics',
                    path: '/statistics/emotional-statistics',
                    component: './Statistics/EmotionalStatistics',
                  },
                  {
                    name: 'cooperation-statistics',
                    path: '/statistics/cooperation-statistics',
                    component: './Statistics/CooperationStatistics',
                  },               
                ],
              },
              {
                path: '/movie-queries',
                name: 'movie-queries',
                icon: 'dashboard',
                routes: [
                  {
                    name: 'search-by-name',
                    path: '/movie-queries/search-by-name',
                    component: './MovieQueries/SearchByName',
                  },
                  {
                    name: 'movie-length',
                    path: '/movie-queries/movie-length',
                    component: './MovieQueries/MovieLength',
                  },
                  {
                    name: 'publish-time',
                    path: '/movie-queries/publish-time',
                    component: './MovieQueries/PublishTime',
                  },
                  {
                    name: 'user-review',
                    path: '/movie-queries/user-review',
                    component: './MovieQueries/UserReview',
                  },
                  {
                    name: 'comment-user',
                    path: '/movie-queries/comment-user',
                    component: './MovieQueries/CommentUser',
                  },
                  {
                    name: 'composition',
                    path: '/movie-queries/composition',
                    component: './MovieQueries/Composition',
                  },
                ],
              },
              {
                path: '/relation-queries',
                name: 'relation-queries',
                icon: 'dashboard',
                routes: [
                  {
                    name: 'director-with-actor',
                    path: '/relation-queries/director-with-actor',
                    component: './RelationQueries/DirectorWithActor',
                  },
                ]
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
