<script>
  export let course
</script>

<!-- card -->
<div class="rounded-lg shadow-md bg-primary-300">
  <!-- content -->
  <div class="p-2 text-gray-800">
    <h3 class="text-lg font-semibold">
      {course.title}
    </h3>
    <p class="mt-2 line-clamp-3">
      {course.description}
    </p>
    <p class="mt-2 text-gray-600">
      Locn: {course.location} <br />
      Pres: {course.presenter} <br />
    </p>
    <p class="mt-2 text-sm line-clamp-3">
      {course.liason}
      Min: {course.minimumEnrolments || ''} Max: {course.maximumEnrolments || ''} Cost: {course.cost || ''}
    </p>
  </div>
</div>
