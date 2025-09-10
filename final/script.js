// // ---------- UI logic ----------
// document.addEventListener('DOMContentLoaded', ()=> {
//   const mapContainer = document.getElementById('map-container');

//   allDistricts.forEach(id => {
//     const data = districtData[id];

//     // create dot element
//     const dotWrapper = document.createElement('div');
//     dotWrapper.className = 'district';
//     dotWrapper.id = id;

//     const dot = document.createElement('span');
//     dot.className = 'dot ' + (data.count > 0 ? 'green' : 'red');
//     dotWrapper.appendChild(dot);

//     mapContainer.appendChild(dotWrapper);

//     // hover -> bubbles
//     if(data.count > 0){
//       dotWrapper.addEventListener('mouseenter', () => {
//         const max = Math.min(12, data.count);
//         for(let i=0;i<max;i++){
//           const b = document.createElement('span');
//           b.className = 'bubble';
//           b.style.left = ( (Math.random()*36) - 18 ) + 'px';
//           b.style.top  = ( (Math.random()*-36) - 6 ) + 'px';
//           dotWrapper.appendChild(b);
//           setTimeout(()=> b.remove(), 1400 + Math.random()*300);
//         }
//       });
//     }

//     // click -> open student list panel
//     dotWrapper.addEventListener('click', () => {
//       const panel = document.getElementById('student-panel');
//       const title = document.getElementById('panel-title');
//       const list = document.getElementById('panel-list');
//       title.textContent = id + ' — Students (' + (data?.count || 0) + ')';
//       list.innerHTML = '';
//       if (!data || data.count === 0) {
//         const li = document.createElement('li');
//         li.textContent = 'No students from this district.';
//         list.appendChild(li);
//       } else {
//         data.students.forEach(s => {
//           const li = document.createElement('li');
//           li.textContent = s.name;
//           li.addEventListener('click', (e) => {
//             e.stopPropagation();
//             openStudentModal(s);
//           });
//           list.appendChild(li);
//         });
//       }
//       panel.classList.remove('hidden');
//     });
//   });

//   // close student list panel
//   document.getElementById('close-panel').addEventListener('click', ()=> {
//     document.getElementById('student-panel').classList.add('hidden');
//   });

//   // close student profile modal
//   document.getElementById('close-modal').addEventListener('click', ()=> {
//     document.getElementById('student-modal').classList.add('hidden');
//   });

//   // click outside modal content closes modal
//   document.getElementById('student-modal').addEventListener('click', (ev) => {
//     if (ev.target.id === 'student-modal') {
//       document.getElementById('student-modal').classList.add('hidden');
//     }
//   });
// });

// // ---------- Open student profile ----------
// function openStudentModal(s){
//   document.getElementById('modal-photo').src = s.img; 
//   document.getElementById('modal-name').textContent = s.name;
//   document.getElementById('modal-intro').textContent = s.introduction;

//   // skills
//   const skills = document.getElementById('modal-skills');
//   skills.innerHTML = '';
//   s.skills.forEach(k => {
//     const li = document.createElement('li');
//     li.textContent = k;
//     skills.appendChild(li);
//   });

//   // projects
//   const projects = document.getElementById('modal-projects');
//   projects.innerHTML = '';
//   s.projects.forEach(p => {
//     const li = document.createElement('li');
//     if (p.link) {
//       const a = document.createElement('a');
//       a.href = p.link;
//       a.target = "_blank";
//       a.textContent = p.Project;
//       li.appendChild(a);
//     } else {
//       li.textContent = p.Project;
//     }
//     projects.appendChild(li);
//   });

//   document.getElementById('student-modal').classList.remove('hidden');
// }


// ---------- UI logic ----------
document.addEventListener('DOMContentLoaded', ()=> {
  const mapContainer = document.getElementById('map-container');

  allDistricts.forEach(id => {
    const data = districtData[id];

    // create dot element
    const dotWrapper = document.createElement('div');
    dotWrapper.className = 'district';
    dotWrapper.id = id;

    // Fix Saharsa position
    if(id === 'Saharsa') {
      dotWrapper.style.position = "absolute";
      dotWrapper.style.top = "45%";
      dotWrapper.style.left = "65%";
    } else if(districtCoords[id]){
      dotWrapper.style.position = "absolute";
      dotWrapper.style.top = districtCoords[id].top;
      dotWrapper.style.left = districtCoords[id].left;
    }

    const dot = document.createElement('span');
    dot.className = 'dot ' + (data.count > 0 ? 'green' : 'red');
    dotWrapper.appendChild(dot);

    // Add district label
    const label = document.createElement('div');
    label.textContent = id;
    label.style.position = 'absolute';
    label.style.top = '-15px'; // Adjust vertical position as needed
    label.style.left = '50%';
    label.style.transform = 'translateX(-50%)';
    label.style.backgroundColor = 'white';
    label.style.color = 'black';
    label.style.padding = '2px 5px';
    label.style.fontSize = '10px'; // Adjust font size as needed
    dotWrapper.appendChild(label);


    mapContainer.appendChild(dotWrapper);

    // hover -> bubbles
    if(data.count > 0){
      dotWrapper.addEventListener('mouseenter', () => {
        const max = Math.min(12, data.count);
        for(let i=0;i<max;i++){
          const b = document.createElement('span');
          b.className = 'bubble';
          b.style.left = ( (Math.random()*36) - 18 ) + 'px';
          b.style.top  = ( (Math.random()*-36) - 6 ) + 'px';
          dotWrapper.appendChild(b);
          setTimeout(()=> b.remove(), 1400 + Math.random()*300);
        }
      });
    }

    // click -> open student list panel
    dotWrapper.addEventListener('click', () => {
      const panel = document.getElementById('student-panel');
      const title = document.getElementById('panel-title');
      const list = document.getElementById('panel-list');
      title.textContent = id + ' — Students (' + (data?.count || 0) + ')';
      list.innerHTML = '';
      if (!data || data.count === 0) {
        const li = document.createElement('li');
        li.textContent = 'No students from this district.';
        list.appendChild(li);
      } else {
        data.students.forEach(s => {
          const li = document.createElement('li');
          li.textContent = s.name;
          li.addEventListener('click', (e) => {
            e.stopPropagation();
            openStudentModal(s);
          });
          list.appendChild(li);
        });
      }
      panel.classList.remove('hidden');
    });
  });

  // close student list panel
  document.getElementById('close-panel').addEventListener('click', ()=> {
    document.getElementById('student-panel').classList.add('hidden');
  });

  // close student profile modal
  document.getElementById('close-modal').addEventListener('click', ()=> {
    document.getElementById('student-modal').classList.add('hidden');
  });

  // click outside modal content closes modal
  document.getElementById('student-modal').addEventListener('click', (ev) => {
    if (ev.target.id === 'student-modal') {
      document.getElementById('student-modal').classList.add('hidden');
    }
  });
});

// ---------- Open student profile ----------
function openStudentModal(s){
  document.getElementById('modal-photo').src = s.img; 
  document.getElementById('modal-name').textContent = s.name;
  document.getElementById('modal-intro').textContent = s.introduction;

  // skills
  const skills = document.getElementById('modal-skills');
  skills.innerHTML = '';
  s.skills.forEach(k => {
    const li = document.createElement('li');
    li.textContent = k;
    skills.appendChild(li);
  });

  // projects ✅ FIXED
  const projects = document.getElementById('modal-projects');
  projects.innerHTML = '';
  s.projects.forEach(p => {
    const li = document.createElement('li');
    if (p.link) {
      const a = document.createElement('a');
      a.href = p.link;
      a.textContent = p.project;   // ✅ small 'p'
      li.appendChild(a);
    } else {
      li.textContent = p.project;  // ✅ small 'p'
    }
    projects.appendChild(li);
  });
  console.log(p.link);
  document.getElementById('student-modal').classList.remove('hidden');
}


// ---------- District Wise Grouping ----------
const allDistricts = [
  "Kishanganj","Samastipur","Araria","Begusarai","Sitamarhi","Khagaria",
  "Purnia","Siwan","Patna","Munger","Darbhanga","Katihar","Vaishali",
  "Muzaffarpur","Bhagalpur","Gaya","Nalanda","Nawada","Jamui","Banka",
  "Rohtas","Kaimur","Lakhisarai","Sheikhpura","WestChamparan","EastChamparan",
  "Sheohar","Bhojpur","Buxar","Chhapra","Madhubani","Madhepura","Saharsa","Supaul"
];

// -------- District coordinates (from your HTML) --------
const districtCoords = {
  Kishanganj: {top:"40%", left:"80%"},
  Araria: {top:"40%", left:"70%"},
  Purnia: {top:"48%", left:"75%"},
  Katihar: {top:"55%", left:"76%"},
  Supaul: {top:"38%", left:"60%"},
  Madhepura: {top:"42%", left:"60%"},
  Madhubani: {top:"36%", left:"50%"},
  Darbhanga: {top:"43%", left:"52%"},
  Sitamarhi: {top:"33%", left:"42%"},
  Muzaffarpur: {top:"42%", left:"38%"},
  Vaishali: {top:"50%", left:"37%"},
  Samastipur: {top:"47%", left:"45%"},
  Begusarai: {top:"56%", left:"57%"},
  Khagaria: {top:"52%", left:"66%"},
  Bhagalpur: {top:"60%", left:"70%"},
  Gopalganj: {top:"34%", left:"27%"},
  Siwan: {top:"42%", left:"27%"},
  Saran: {top:"46%", left:"32%"},
  Patna: {top:"54%", left:"43%"},
  Nalanda: {top:"52%", left:"52%"},
  Jehanabad: {top:"60%", left:"40%"},
  Gaya: {top:"70%", left:"40%"},
  Aurangabad: {top:"72%", left:"32%"},
  Rohtas: {top:"68%", left:"25%"},
  Kaimur: {top:"60%", left:"20%"},
  Munger: {top:"60%", left:"63%"},
  Lakhisarai: {top:"60%", left:"52%"},
  Sheikhpura: {top:"64%", left:"50%"},
  Nawada: {top:"68%", left:"48%"},
  Jamui: {top:"70%", left:"60%"},
  Banka: {top:"70%", left:"66%"},
  WestChamparan: {top:"20%", left:"28%"},
  EastChamparan: {top:"28%", left:"33%"},
  Sheohar: {top:"37%", left:"36%"},
  Bhojpur: {top:"58%", left:"30%"},
  Buxar: {top:"55%", left:"25%"},
  Chhapra: {top:"38%", left:"44%"},
  Saharsa: {top:"45%", left:"65%"} // missing in HTML, added approx
};

// ---------- Group student data ----------
const districtData = {};
allDistricts.forEach(d => {
  const stds = students.filter(s => s.district === d);
  districtData[d] = {
    count: stds.length,
    students: stds
  };
});

// ---------- UI logic ----------
document.addEventListener('DOMContentLoaded', ()=> {
  const mapContainer = document.getElementById('map-container');

  allDistricts.forEach(id => {
    const data = districtData[id];

    // create dot element
    const dotWrapper = document.createElement('div');
    dotWrapper.className = 'district';
    dotWrapper.id = id;

    // Fix Saharsa position
    if(id === 'Saharsa') {
      dotWrapper.style.position = "absolute";
      dotWrapper.style.top = "45%";
      dotWrapper.style.left = "65%";
    } else if(districtCoords[id]){
      dotWrapper.style.position = "absolute";
      dotWrapper.style.top = districtCoords[id].top;
      dotWrapper.style.left = districtCoords[id].left;
    }

    const dot = document.createElement('span');
    dot.className = 'dot ' + (data.count > 0 ? 'green' : 'red');
    dotWrapper.appendChild(dot);

    

    mapContainer.appendChild(dotWrapper);

    // hover -> bubbles
    if(data.count > 0){
      dotWrapper.addEventListener('mouseenter', () => {
        const max = Math.min(12, data.count);
        for(let i=0;i<max;i++){
          const b = document.createElement('span');
          b.className = 'bubble';
          b.style.left = ( (Math.random()*36) - 18 ) + 'px';
          b.style.top  = ( (Math.random()*-36) - 6 ) + 'px';
          dotWrapper.appendChild(b);
          setTimeout(()=> b.remove(), 1400 + Math.random()*300);
        }
      });
    }

    // click -> open student list panel
    dotWrapper.addEventListener('click', () => {
      const panel = document.getElementById('student-panel');
      const title = document.getElementById('panel-title');
      const list = document.getElementById('panel-list');
      title.textContent = id + ' — Students (' + (data?.count || 0) + ')';
      list.innerHTML = '';
      if (!data || data.count === 0) {
        const li = document.createElement('li');
        li.textContent = 'No students from this district.';
        list.appendChild(li);
      } else {
        data.students.forEach(s => {
          const li = document.createElement('li');
          li.textContent = s.name;
          li.addEventListener('click', (e) => {
            e.stopPropagation();
            openStudentModal(s);
          });
          list.appendChild(li);
        });
      }
      panel.classList.remove('hidden');
    });
  });

  // close student list panel
  document.getElementById('close-panel').addEventListener('click', ()=> {
    document.getElementById('student-panel').classList.add('hidden');
  });

  // close student profile modal
  document.getElementById('close-modal').addEventListener('click', ()=> {
    document.getElementById('student-modal').classList.add('hidden');
  });

  // click outside modal content closes modal
  document.getElementById('student-modal').addEventListener('click', (ev) => {
    if (ev.target.id === 'student-modal') {
      document.getElementById('student-modal').classList.add('hidden');
    }
  });
});

// ---------- Open student profile ----------
function openStudentModal(s){
  document.getElementById('modal-photo').src = s.img; 
  document.getElementById('modal-name').textContent = s.name;
  document.getElementById('modal-intro').textContent = s.introduction;

  // skills
  const skills = document.getElementById('modal-skills');
  skills.innerHTML = '';
  s.skills.forEach(k => {
    const li = document.createElement('li');
    li.textContent = k;
    skills.appendChild(li);
  });

  // projects
  const projects = document.getElementById('modal-projects');
  projects.innerHTML = '';
  s.projects.forEach(p => {
    const li = document.createElement('li');
    if (p.link) {
      const a = document.createElement('a');
      a.href = p.link;
      a.target = "_blank";
      a.textContent = p.Project;
      li.appendChild(a);
    } else {
      li.textContent = p.Project;
    }
    projects.appendChild(li);
  });

  document.getElementById('student-modal').classList.remove('hidden');
}

// campus js
function toggleMembers(houseId) {
  const membersDiv = document.getElementById(`${houseId}-members`);
  const button = document.querySelector(`button[onclick="toggleMembers('${houseId}')"]`);

  // Toggle the 'show' class to trigger the CSS animation
  membersDiv.classList.toggle('show');

  // Check if the content is now shown and update the button text
  if (membersDiv.classList.contains('show')) {
      button.textContent = "Show Less";
  } else {
      button.textContent = "Know More";
  }
}