import {observable, action} from 'mobx';

class RootStore {
    // @observable mobile = "02108752367";
    // @observable token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA1MSwibmFtZSI6IjAyMTA4NzUyMzY3IiwiaWF0IjoxNjEzMzgyNzE1LCJleHAiOjE2MzkzMDI3MTV9.Ft-YCv57JnOv_UvV6t6zE1C53j8PpeBE-qrwOTdmpls";
    // @observable userId = "21087523671613113602541";
    @observable mobile = "";
    @observable token = "";
    @observable userId = "";

    @action setUserInfo(mobile, token, userId){
        this.mobile = mobile;
        this.token = token;
        this.userId = userId;
    }
}

export default new RootStore();