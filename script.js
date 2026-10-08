const $ = (q, root=document) => root.querySelector(q);
const $$ = (q, root=document) => [...root.querySelectorAll(q)];

const menuBtn = $("#menuBtn");
const nav = $("#nav");
menuBtn?.addEventListener("click", () => nav.classList.toggle("open"));
$$(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
$$(".reveal").forEach(el => observer.observe(el));

const filters = $$(".filter");
const cards = $$(".photo-card");
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(x => x.classList.remove("active"));
  btn.classList.add("active");
  const filter = btn.dataset.filter;
  cards.forEach(card => {
    card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
  });
}));

const photoModal = $("#photoModal");
const modalImage = $("#modalImage");
const modalTitle = $("#modalTitle");
const modalText = $("#modalText");

cards.forEach(card => card.addEventListener("click", () => {
  modalImage.src = card.dataset.image;
  modalTitle.textContent = card.dataset.title;
  modalText.textContent = card.dataset.text;
  photoModal.showModal();
}));

const fanpulseModal = $("#fanpulseModal");
$("#openFanpulseImage")?.addEventListener("click", () => fanpulseModal.showModal());

$$("[data-close]").forEach(btn => btn.addEventListener("click", () => btn.closest("dialog").close()));
$$("dialog").forEach(dialog => dialog.addEventListener("click", e => {
  const r = dialog.getBoundingClientRect();
  if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
}));

const glow = $(".cursor-glow");
window.addEventListener("pointermove", e => {
  if(!glow) return;
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

document.addEventListener("keydown", e => {
  if(e.key === "Escape") $$("dialog[open]").forEach(d => d.close());
});