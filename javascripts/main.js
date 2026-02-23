//jobPost Array
const totalJobs = [
  {
    jobId: Date.now(),
    companyName: "Mobile First Corp",
    jobPosition: "React Native Developer",
    location: "Remote",
    jobType: "Full-time",
    salaryRange: "৳25000 - ৳35000",
    status: "Not Applied",
    jobDescription:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
  },
  {
    jobId: Date.now() + 1,
    companyName: "TechNova Solutions",
    jobPosition: "Frontend Developer",
    location: "Dhaka",
    jobType: "Full-time",
    salaryRange: "৳18000 - ৳24000",
    status: "Not Applied",
    jobDescription:
      "Develop responsive web applications using React and Tailwind CSS.",
  },
  {
    jobId: Date.now() + 2,
    companyName: "CloudSync Ltd",
    jobPosition: "Backend Developer",
    location: "Remote",
    jobType: "Full-time",
    salaryRange: "৳22000 - ৳27000",
    status: "Not Applied",
    jobDescription:
      "Design and maintain scalable backend systems using Node.js and Express.",
  },
  {
    jobId: Date.now() + 3,
    companyName: "PixelCraft Studio",
    jobPosition: "UI/UX Designer",
    location: "Chittagong",
    jobType: "Part-time",
    salaryRange: "৳9000 - ৳13000",
    status: "Not Applied",
    jobDescription:
      "Create modern and user-friendly UI designs for web and mobile applications.",
  },
  {
    jobId: Date.now() + 4,
    companyName: "DataNest Analytics",
    jobPosition: "Data Analyst",
    location: "Remote",
    jobType: "Contract",
    salaryRange: "৳20000 - ৳25000",
    status: "Not Applied",
    jobDescription:
      "Analyze large datasets and generate actionable insights for business growth.",
  },
  {
    jobId: Date.now() + 5,
    companyName: "SecureNet Systems",
    jobPosition: "Cyber Security Specialist",
    location: "Dhaka",
    jobType: "Full-time",
    salaryRange: "৳30000 - ৳35000",
    status: "Not Applied",
    jobDescription:
      "Monitor and secure company infrastructure against cyber threats.",
  },
  {
    jobId: Date.now() + 6,
    companyName: "AI Vision Labs",
    jobPosition: "Machine Learning Engineer",
    location: "Remote",
    jobType: "Full-time",
    salaryRange: "৳35000 - ৳47000",
    status: "Not Applied",
    jobDescription:
      "Develop and deploy machine learning models for real-world AI applications.",
  },
  {
    jobId: Date.now() + 7,
    companyName: "DevOpsify",
    jobPosition: "DevOps Engineer",
    location: "Khulna",
    jobType: "Full-time",
    status: "Not Applied",
    status: "not_applied",
    salaryRange: "৳28000 - ৳34000",
    jobDescription: "Develop and deploy machine learning models for real-world AI applications.",
}];
let activeFilter = "All";
const jobPostsContainer = document.getElementById("jobPost-container");
// count elements
const totalCountElement = document.getElementById("totalCount");
const interviewCountElement = document.getElementById("interviewCount");
const rejectedCountElement = document.getElementById("rejectedCount");
const availableJobsCountElement = document.getElementById("availableJobsCount");

// delete modal elements
const deleteModalToggle = document.getElementById("delete-modal-toggle");
const deleteModalText = document.getElementById("delete-modal-text");
const deleteConfirmBtn = document.getElementById("delete-confirm-btn");
const deleteCancelBtn = document.getElementById("delete-cancel-btn");
let pendingDeleteId = null;

function normalizeStatus(statusValue) {
  if (!statusValue) return "Not Applied";
  const lower = String(statusValue).toLowerCase();
  if (lower === "interview") return "Interview";
  if (lower === "rejected") return "Rejected";
  return "Not Applied";
}

function updateCounts(visibleCount = null) {
  const total = totalJobs.length;
  let interview = 0;
  let rejected = 0;
  totalJobs.forEach((jobItem) => {
    const normalizedStatus = normalizeStatus(jobItem.status);
    if (normalizedStatus === "Interview") interview++;
    if (normalizedStatus === "Rejected") rejected++;
  });

  if (totalCountElement) totalCountElement.textContent = total;
  if (interviewCountElement) interviewCountElement.textContent = interview;
  if (rejectedCountElement) rejectedCountElement.textContent = rejected;
  if (availableJobsCountElement) {
    if (visibleCount === null) visibleCount = total;
    availableJobsCountElement.textContent = `${visibleCount} Jobs`;
  }
}

function renderJobPosts(filter = "All") {
  activeFilter = filter;
  jobPostsContainer.innerHTML = "";

  let filteredJobs = totalJobs;
  if (filter !== "All") {
    filteredJobs = totalJobs.filter((job) => job.status === filter);
  }

  if (filteredJobs.length !== 0) {
    filteredJobs.forEach((job, index) => {
      const status = normalizeStatus(job.status);
      const post = document.createElement("div");
      post.className =
        "p-4 md:p-6 bg-white border-l-4 border-gray-200 rounded-md shadow-xs flex flex-col gap-5 card card-hover card-enter";
      // animation
      post.style.animationDelay = (index * 60) + "ms";
      post.setAttribute("data-jobid", job.jobId);
      post.innerHTML = `
            <div class="flex flex-row justify-between">
                        <div class="flex flex-col gap-1">
                            <h1 class="text-lg font-semibold text-darkblue">${job.companyName}</h1>
                            <p class="text-base font-normal text-gray-500">${job.jobPosition}</p>
                        </div>
                        <div>
                          <i data-jobid="${job.jobId}"
                            class="job-delete-btn fa-regular fa-trash-can p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-red-500 transform transition duration-200 hover:scale-110"></i>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-5 text-gray-500 text-base font-normal">
                        <span>• ${job.location}</span>
                        <span>• ${job.jobType}</span>
                        <span>• ${job.salaryRange}</span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row gap-1">
                            <div
                                class="max-w-28 py-1 px-2 text-center bg-status border border-blue-100 font-medium text-[14px] text-darkblue uppercase ${
                                  status === "Not Applied" ? "" : "hidden"
                                }">
                                Not Applied</div>
                            <div
                                class="max-w-28 py-1 text-center bg-green-100/50 border border-green-500 font-medium text-[14px] text-green-500 uppercase px-2 ${
                                  status === "Interview" ? "" : "hidden"
                                }">
                                Interview</div>
                            <div
                                class="max-w-28 py-1 text-center bg-red-100/50 border border-red-500 font-medium text-[14px] text-red-500 uppercase px-2 ${
                                  status === "Rejected" ? "" : "hidden"
                                }">
                                Rejected</div>
                        </div>
                        <p class="text-[14px] font-normal text-gray-700">
                            ${job.jobDescription}
                        </p>
                    </div>
                    <div class="flex flex-row gap-2">
                        <button data-jobid="${job.jobId}" class="job-interview-btn btn btn-outline btn-success hover:text-white">Interview</button>
                        <button data-jobid="${job.jobId}" class="job-rejected-btn btn btn-outline btn-error hover:text-white">Rejected</button>
                    </div>
        `;
      jobPostsContainer.appendChild(post);
    });
  } else {
    const emptyCar = document.createElement("div");
    emptyCar.className = "bg-white px-6 py-12 flex flex-col gap-5 rounded-lg";
    emptyCar.innerHTML = `
              <div class="mx-auto">
              <img class="w-25 mx-auto" src="./assets/documents.png" alt="Documents">
            </div>
            <div class="mx-auto text-center px-4">
              <h1 class="text-2xl md:text-3xl font-semibold text-darkblue">No jobs available</h1>
              <p class="text-base text-gray-500">Check back soon for new job opportunities</p>
            </div>
    `;
    jobPostsContainer.appendChild(emptyCar);
  }
  // update counts (jobs = filteredJobs.length)
  updateCounts(filteredJobs.length);
}

//Button Click logic
const allFilterBtn = document.getElementById("allBtn");
const interviewFilterBtn = document.getElementById("interviewBtn");
const rejectedFilterBtn = document.getElementById("rejectedBtn");

//helper Function
function setActiveFilterButton(activeBtn) {
  const buttons = [allFilterBtn, interviewFilterBtn, rejectedFilterBtn];
  // reset all buttons to default gray
  buttons.forEach((button) => {
    if (!button) return;
    button.classList.remove(
      "text-blue-500",
      "border-blue-500",
      "text-green-500",
      "border-green-500",
      "text-red-500",
      "border-red-500"
    );
    button.classList.add("text-gray-500", "border-gray-200");
  });

  // apply color based on which button is active
  if (!activeBtn) return;
  activeBtn.classList.remove("text-gray-500", "border-gray-200");
  if (activeBtn.id === "allBtn") {
    activeBtn.classList.add("text-blue-500", "border-blue-500");
  } else if (activeBtn.id === "interviewBtn") {
    activeBtn.classList.add("text-green-500", "border-green-500");
  } else if (activeBtn.id === "rejectedBtn") {
    activeBtn.classList.add("text-red-500", "border-red-500");
  }
}

allFilterBtn.addEventListener("click", function () {
  setActiveFilterButton(allFilterBtn);
  renderJobPosts("All");
});

interviewFilterBtn.addEventListener("click", function () {
  setActiveFilterButton(interviewFilterBtn);
  renderJobPosts("Interview");
});

rejectedFilterBtn.addEventListener("click", function () {
  setActiveFilterButton(rejectedFilterBtn);
  renderJobPosts("Rejected");
});

// Delegate clicks from job cards to update status
jobPostsContainer.addEventListener("click", function (event) {
  const interviewBtnClick = event.target.closest(".job-interview-btn");
  const rejectedBtnClick = event.target.closest(".job-rejected-btn");
  const deleteBtnClick = event.target.closest(".job-delete-btn");

  if (deleteBtnClick) {
    const deleteJobId = deleteBtnClick.dataset.jobid;
    pendingDeleteId = deleteJobId;
    // show job company in modal
    const jobForModal = totalJobs.find(function (jobItem) { return String(jobItem.jobId) === String(deleteJobId); });
    if (jobForModal && deleteModalText) {
      deleteModalText.textContent = 'Delete "' + jobForModal.companyName + '"? This cannot be undone.';
    }
    if (deleteModalToggle) {
      deleteModalToggle.checked = true; // open modal
    }
    return;
  }

  if (interviewBtnClick) {
    const interviewJobId = interviewBtnClick.dataset.jobid;
    const job = totalJobs.find((jobItem) => String(jobItem.jobId) === String(interviewJobId));
    if (job) {
      job.status = "Interview";
      renderJobPosts(activeFilter);
      updateCounts();
    }
  }

  if (rejectedBtnClick) {
    const rejectedJobId = rejectedBtnClick.dataset.jobid;
    const job = totalJobs.find((jobItem) => String(jobItem.jobId) === String(rejectedJobId));
    if (job) {
      job.status = "Rejected";
      renderJobPosts(activeFilter);
      updateCounts();
    }
  }
});

// initial render
setActiveFilterButton(allFilterBtn);
renderJobPosts();

// delete confirm handler
if (deleteConfirmBtn) {
  deleteConfirmBtn.addEventListener('click', function () {
    if (!pendingDeleteId) return;
    const jobIndex = totalJobs.findIndex(function (jobItem) { return String(jobItem.jobId) === String(pendingDeleteId); });
    if (jobIndex > -1) {
      totalJobs.splice(jobIndex, 1);
      // close modal
      if (deleteModalToggle) deleteModalToggle.checked = false;
      pendingDeleteId = null;
      renderJobPosts(activeFilter);
      updateCounts();
    }
  });
}

// cancel clears pending id
if (deleteCancelBtn) {
  deleteCancelBtn.addEventListener('click', function () {
    pendingDeleteId = null;
  });
}
