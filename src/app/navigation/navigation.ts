import { FuseNavigation } from '@fuse/types';


export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'Home',
                title    : 'Home',
                translate: 'NAV.Home.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
  
            },
            {
                id       : 'chat',
                title    : 'Chat',
                translate: 'NAV.Chat.TITLE',
                type     : 'item',
                icon     : 'chat',
                url      : '/apps/chat',
               
            },
            {
                id   : 'profile',
                title: 'Profile',
                type : 'item',
                translate: 'NAV.Profile.TITLE',
                icon : 'person',
                url  : '/pages/profile'
            },

        
        ],

    },
    {
        id       : 'Admin',
        title    : 'Admin',
        translate: 'NAV.Admin.TITLE',
        type     : 'collapsable',
        icon     : 'shopping_cart',
        role     : 'Admin',
        children : [
            {
                id        : 'Countries',
                title     : 'Countries',
                translate: 'NAV.Admin.Countries',
                type      : 'item',
                url       : '/apps/Admin/Countries',
                exactMatch: true
            }, 
            {
                id        : 'Cities',
                title     : 'Cities',
                translate: 'NAV.Admin.Cities',                     
                type      : 'item',
                url       : '/apps/Admin/Cities',
                exactMatch: true
            },   
            {
                id        : 'Centers',
                title     : 'Centers',
                translate: 'NAV.Admin.Centers',

                type      : 'item',
                url       : '/apps/Admin/Centers',
                exactMatch: true
            }, 
            {
                id        : 'PrimaryCurrency',
                title     : 'PrimaryCurrency',
                translate: 'NAV.Admin.PrimaryCurrency',

                type      : 'item',
                url       : '/apps/Admin/PrimaryCurrency',
                exactMatch: true
            },   
             {
                 id        : 'currencies',
                 title     : 'currencies',
                 translate: 'NAV.Admin.currencies',
                 type      : 'item',
                 url       : '/apps/Admin/currencies',
                 exactMatch: true
            },  

      
            

        ]
    },
    
{
    id   : 'Offers',
    title: 'Offers',
    translate: 'NAV.Offers.TITLE',

    type : 'item',
    icon : 'person',
    url  : '/apps/Offer/Offers'
},  
 {
    id   : 'Orders',
    title: 'Orders',
    translate: 'NAV.Offers.TITLE',
    type : 'item',
    icon : 'person',
    url  : '/apps/Order/Orders'
},    
  {
     id   : 'Currency',
    title: 'Currency',
    translate: 'NAV.Currency.TITLE',

     type : 'item',
    icon : 'person',
     url  : '/apps/UserCurrencies/UserCurrencies'
 }
];
