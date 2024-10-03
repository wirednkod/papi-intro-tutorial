
<div class="content-row">
<div class="content-col">

{{#include ./template/README.md}}

</div>

<div class="content-col">

<div class="tab">
  <button class="maintab tablinks active" onclick="switchMainTab(event, 'Template')">Template</button>
  <button class="maintab tablinks" onclick="switchMainTab(event, 'Solution')">Solution</button>
  <button class="maintab tablinks" onclick="switchMainTab(event, 'Diff')">Diff</button>
</div>

<div id="Template" class="maintab tabcontent active">

<div class="tab">
<button class="subtab tablinks file-template file-modified active" onclick="switchSubTab(event, 'bun.lockb')" data-id="bun.lockb">bun.lockb</button>
<button class="subtab tablinks file-template file-modified" onclick="switchSubTab(event, 'index.ts')" data-id="index.ts">index.ts</button>
</div>
<div id="template/bun.lockb" class="subtab tabcontent active" data-id="bun.lockb">

```text
{{#include ./template/bun.lockb}}
```

</div>

<div id="template/index.ts" class="subtab tabcontent" data-id="index.ts">

```text
{{#include ./template/index.ts}}
```

</div>



</div>

<div id="Solution" class="maintab tabcontent">

<div class="tab">
<button class="subtab tablinks file-solution file-modified active" onclick="switchSubTab(event, 'bun.lockb')" data-id="bun.lockb">bun.lockb</button>
<button class="subtab tablinks file-solution file-modified" onclick="switchSubTab(event, 'index.ts')" data-id="index.ts">index.ts</button>
</div>
<div id="solution/bun.lockb" class="subtab tabcontent active" data-id="bun.lockb">

```text
{{#include ./solution/bun.lockb}}
```

</div>

<div id="solution/index.ts" class="subtab tabcontent" data-id="index.ts">

```text
{{#include ./solution/index.ts}}
```

</div>



</div>

<div id="Diff" class="maintab tabcontent">


<div class="tab">
	<button class="difftab tablinks active" onclick="switchDiff(event, 'template.diff')" data-id="template.diff">template.diff</button>
	<button class="difftab tablinks" onclick="switchDiff(event, 'solution.diff')" data-id="solution.diff">solution.diff</button>
</div>
<div id="template.diff" class="difftab tabcontent active" data-id="template.diff">

```diff
{{#include ./template/template.diff}}
```

</div>
<div id="solution.diff" class="difftab tabcontent" data-id="solution.diff">

```diff
{{#include ./solution/solution.diff}}
```

</div>

</div>

</div>
</div>
