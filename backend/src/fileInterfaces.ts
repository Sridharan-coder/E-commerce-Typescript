
export namespace DBInterfaces {


    export interface SellerInterface {
        _id?: string;
        s_id: number;
        s_name: string;
        s_phoneNumber: number;
        s_emailAddress: string;
        s_password: string;
        __v?: number;
    }

    export interface UserInterface {
        _id?: string;
        u_id: number;
        u_name: string;
        u_phoneNumber: number;
        u_emailAddress: string;
        u_password: string;
        u_carts?: Array<number>;
        u_whitelist?: Array<number>;
        __v?: number;
    }

    export interface ProductWarehouse {
        _id?: string;
        p_id: number;
        p_name: string;
        p_price: number;
        p_image: string;
        p_type: string;
        p_stock: number;
        s_ids: Array<number>;
        __v?: number;
    }
}


export namespace FileStructure {
    export interface FilesInterface {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
    }
}

export namespace CustomError {
    export interface Error {
        name: string;
        message: string;
        stack?: string;
        statusCode?:number;
    }
}