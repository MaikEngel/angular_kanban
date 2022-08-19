export class Task {
    public title: string;
    public category: string;
    public urgency: string;
    public description: string;
    public date: any;
    public createdAt: any;

    constructor(obj?: any) {
        this.title = obj? obj.title : '';
        this.category = obj? obj.category : '';
        this.urgency = obj? obj.urgency : '';
        this.description = obj? obj.description : '';
        this.date = obj? obj.date : '';
    }

    toJSON() {
        return {
            title: this.title,
            category: this.category,
            urgency: this.urgency,
            description: this.description,
            date: this.date.toLocaleDateString(),
            createdAt: new Date().toLocaleDateString()
        }
    }
}