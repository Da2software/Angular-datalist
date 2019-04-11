# input-datalist
datalist to use on multiple browsers, also Safari that have compatibility issues with the datalist components
I prefer to upload the component folder because I want to make this element modifiable, and it´s possible in the future to make a "npm" module to install it.

# How to use it
 first create one component with the command:
 ` npm generate component [any path]/input-datalist`
 
You can copy each part of the code on the new component generated.
  
`input-datalist.component.css \n
input-datalist.component.html \n
input-datalist.component.spec.ts \n
input-datalist.component.ts`

you add the datalist using this code:
`<app-input-datalist></app-input-datalist>`
# Properties
## id datalist 
use with **[idList]="string id"** code and you can add some ID to the data list component.
## data list
use with **[item_list]="[Array JSON]"** code and you can add the JSON array with the data that you need to show.
```json
[{
"colum_name": "item 1",
"value": 1
},{
"colum_name": "item 1",
"value": 1
}]
```
## select the column list
use with **[columnValue]="string column name"** code to select the header to show on the suggestions, according to the JSON.
## input element reference
use with **[inputElement]="angular HTML ID"** code and you can add the html input reference.
```html
<input #stEntry id="stEntry" ngModel name="stEntry" value="" autocomplete="off">
<app-input-datalist  [inputElement]="stEntry"></app-input-datalist>
```
## get the item selected (event)
use with **(OnSelectItem)="function"** code to return the event, and the item selected.
```html
<app-input-datalist  (OnSelectItem)="addSelection($event)"></app-input-datalist>
```
**$event** returns the JSON item.
```json
{"colum_name": "item 1","value": 1} //like this
```
**note:** please modify the css file.
