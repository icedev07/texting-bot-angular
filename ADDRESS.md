# OPTIONAL Question: 🗺️ Address

There are a lot of places in our Angular application where we need to ask the user for a physical address such as this one:

*Example Address*

```javascript
123 Main St
New York, NY 18814
```

In order to add an address field to many parts of our application to minimize code duplication, you would:
- Build a reusable address form component
- Possibly use an API or library to help with address validation / autocomplete
- Properly organize address logic/formatting/validation
- Include tests, etc.

## We will use the address control like this

```javascript
export class AppComponent {

	mainForm = new FormGroup({
		accept: new FormControl(), // true; false;
		address: new FormControl()
 	})
    }
}


----app-component.html
<form [formGroup]="mainForm">
    <mat-checkbox [formControlName]="accept"></mat-checkbox>
    <app-address [formControlName]="address"></app-address>
</form>
```

## 🤔⁉️ Question

How will your component interact with parent form groups? How will it share data with them? Please include detailed information about this.

## 🫵 Write your answer here

_Please write your answer here_

## 🧐️ FAQs

### Do I have to write any code for the question above?

No need to write code. Just a detailed answer is all we're looking for.
