import { HubConnectionBuilder } from '@aspnet/signalr';
////////////////////////////////Header///////////////////////////////////////////
export const header ={headers : {'content-Type' : 'application/json'}}
export const Api='https://localhost:44347/'; 
//export const Api='https://api.sila-ex.com/';
export const register = Api+'Account/register';
export const login =Api+'Account/authenticate';
export const forgetPassword =Api+'Account/forgot-password';
export const restPassword =Api+'Account/reset-password';
export const ExternalProvider = Api+'Account/ExternalProvider';
/////////////////////////////// SignalR    //////////////////////////////////////////////
export const SignalRApi = Api+'MessageHub/'; 
////////////////////////////////mainCurrency///////////////////////////////////////////
export const mainCurrencyApi = Api+'api/MainCurrency/'; 
export const CurrencyCodesApi = Api+'api/Currencies/codes'; 
////////////////////////////////myOrders///////////////////////////////////////////
export const GetOrders = Api+'api/Offers/myorder';
////////////////////////////////OFFERS///////////////////////////////////////////
export const GetOffers = Api+'Offers';
export const InsertOffers = Api+'Offers';
export const GetOffersByID = Api+'Offers/';
export const EditOffers = Api+'Offers/';
export const DeleteOffers = Api+'Offers/';
export const OffersApi = Api+'api/Offers/';
export const myOfferApi = Api+'api/Offers/myOffer';
export const myorderandprofile = Api+'api/Offers/myorderandprofile';

export const AcceptOffers = Api+'api/Offers/AcceptOffer';
/////////////////////////////// cities    //////////////////////////////////////////////
export const citiesApi = Api+'api/cities/'; 
/////////////////////////////// Countries    //////////////////////////////////////////////
export const CountriesApi = Api+'api/Countries/';  
/////////////////////////////// Countries    //////////////////////////////////////////////
export const centersApi = Api+'api/Centers/'; 
////////////////////////////////photo///////////////////////////////////////////
export const Profileimage = Api+'Account/uploadImage/';
////////////////////////////////info///////////////////////////////////////////
export const Profileinfo = Api+'Account/updateinfo/';
//////////////////////////////////////////////////////////////////////////////
export const postSkip = Api+'Context/chatsbyidSkip';
export const chatsInsertforRequest = Api+'Context/chatsInsertforRequest';
export const postmessage = Api+'Context/chatsInsert';
export const getContext = Api+'Context/chatsbyid';
export const getContext1 = Api+'Context/Context';
export const getuseruser = Api+'Context/user';
export const getgetUserChats = Api+'Context/chats';
//////////////////////////////////////////////////////////
export const getRates = Api+'Api/Rates';
export const CloseOffer = Api+'api/Offers/CloseOffer';
export const SuccessOffer = Api+'api/Offers/SuccessOffer';
export const GetFullNmae = Api+'Account/GetFullNmae';
export const postRates = Api+'api/Rates';
export const AcceptOffer = Api+'Offers/AcceptOffer';
export const AcceptOffer1 = Api+'api/Offers/Aceptoffer';
export const CurrencisApi = Api+'api/Currencies/';
export const AllCurrencisApi = Api+'api/Currencies/All';
export const citycentersApi = Api+'api/Centers/city/'; 
//////////////////////////////////////////////
export const getCounts = Api+'api/Offers/offersCounts'; 
export const myOfferAccepted = Api+'api/Offers/myOfferAccepted'; 


export const hubconnection= new HubConnectionBuilder()
.withUrl(SignalRApi)
.build();

