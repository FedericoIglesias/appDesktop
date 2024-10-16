export namespace main {
	
	export class Task {
	    Id: number;
	    Task: string;
	    Priorly: number;
	
	    static createFrom(source: any = {}) {
	        return new Task(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Task = source["Task"];
	        this.Priorly = source["Priorly"];
	    }
	}

}

