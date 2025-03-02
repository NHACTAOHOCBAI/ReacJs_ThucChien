export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        results: T[]
    }
    interface ILogin {
        access_token: string;
        user: {
            email: string
            phone: string
            fullName: string
            role: string
            avatar: string
            id: string
        }
    }
    interface IRegister {
        _id: string,
        email: string,
        fullName: string
    }

    interface IUser {
        email: string
        phone: string
        fullName: string
        role: string
        avatar: string
        id: string
    }
    interface IFetchAccount {
        user: IUser
    }
    interface IModelPaginate<T> {
        meta: {
            current: number,
            pageSize: number,
            pages: number,
            total: number
        }
        result: T[]
    }
    interface IUserTable {
        _id: string
        fullName: string
        email: string
        phone: string
        role: string
        avatar: string
        isActive: boolean,
        type: string,
        createdAt: Date,
        updatedAt: Date
        __v: number
    }
    interface IResponseImport {
        countSuccess: number
        countError: number
        detail: any
    }
    interface IDelete {
        acknowledged: boolean,
        deletedCount: number
    }
}

