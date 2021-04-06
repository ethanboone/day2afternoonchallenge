import Job from "../Models/Job.js"
import { jobsService } from "../Services/JobsService.js"
import { ProxyState } from "../AppState.js"


function _draw() {
    let jobs = ProxyState.jobs
    let template = ''
    jobs.forEach(job =>
        template += `${job.Template}`
    )
    document.getElementById('jobs').innerHTML = template
}


export default class JobsController {
    constructor() {
        ProxyState.on("jobs", _draw)

        this.getJobs()
    }

    async getJobs() {
        try {
            await jobsService.getJobs()
        } catch (error) {
            console.log(error)
        }
    }

    async createJob() {
        try {
            window.event.preventDefault()
            let form = window.event.target
            let job = {
                company: form.company.value,
                jobTitle: form.jobTitle.value,
                hours: form.hours.value,
                rate: form.rate.value,
                description: form.description.value
            }
            await jobsService.createJob(job)
            form.reset()

            $('#new-job-form').modal('hide')
        } catch (error) {
            console.log(error)
        }
    }

    deleteJob(id) {
        try {
            jobsService.deleteJob(id)
        } catch (error) {
            console.log(error)
        }
    }
}