import { ProxyState } from "../AppState.js";
import Job from "../Models/Job.js";
import { api } from "./AxiosService.js";

class JobsService {
    async getJobs() {
        let res = await api.get('jobs')
        ProxyState.jobs = res.data.map(j => new Job(j))
        console.log(ProxyState.jobs)
    }

    async createJob(job) {
        let res = await api.post('jobs', job)
        res.data.id = res.data._id
        let j = new Job(res.data)
        ProxyState.jobs = [...ProxyState.jobs, j]
    }

    async deleteJob(id) {
        let res = await api.delete('jobs/' + id)
        ProxyState.jobs = ProxyState.jobs.filter(job => job.id != id)
    }
}

export const jobsService = new JobsService()