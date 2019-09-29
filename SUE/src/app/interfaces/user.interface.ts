import { IMajor } from './major.interface';

interface IPosition {
	internship: boolean,
	coop: boolean,
	fulltime: boolean
}

export interface IUser {
	firstname: string,
	lastname: string,
	email: string,
	phonenum: number,
	major: IMajor,
	position: IPosition,
	citizenship: string
}