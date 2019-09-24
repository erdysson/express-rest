export interface IItemDetails {    images: string[];    measurements: string;    description: string;}export interface IItem {    id: string;    name: string;    price: string;    showDetail: boolean;    showPrice: boolean;    imageUrl: string;    fbLink: string;    details: IItemDetails;}export interface IProduct {    title: string;    name: string;    items: IItem[];}export interface IHomeItem {    image: string;    link: string;}export interface IHome {    items: IHomeItem[];}