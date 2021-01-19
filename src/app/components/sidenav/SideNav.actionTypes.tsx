
export interface IProps {
    item:{
        unique:string;
        active:string;
    };
    makeActive : () => void;
}