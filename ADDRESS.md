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

To make the address component work with parent forms, I'll implement it as a custom form control using ControlValueAccessor. Here's how it works:

1. Component Setup:
```typescript
@Component({
  selector: 'app-address',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressComponent),
      multi: true
    }
  ]
})
export class AddressComponent implements ControlValueAccessor {
  addressForm = new FormGroup({
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)])
  });

  writeValue(value: any): void {
    if (value) {
      this.addressForm.patchValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.addressForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    // Handle touch events
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.addressForm.disable() : this.addressForm.enable();
  }
}
```

2. Data Flow:
- When the parent form sets a value, it flows down through writeValue()
- When the address form changes, it flows up through valueChanges
- Validation states sync automatically with the parent form

3. Usage in Parent:
```typescript
// Parent component
export class ParentComponent {
  form = new FormGroup({
    address: new FormControl()
  });
}

// Parent template
<form [formGroup]="form">
  <app-address [formControlName]="address"></app-address>
</form>
```

4. Key Points:
- The component maintains its own FormGroup for address fields
- It implements ControlValueAccessor to work with form controls
- Validation is handled internally but exposed to parent
- State changes (dirty, touched, etc.) propagate automatically
- The component can be disabled/enabled from parent form

This approach makes the address component reusable across the application while maintaining proper form integration.

## 🧐️ FAQs

### Do I have to write any code for the question above?

No need to write code. Just a detailed answer is all we're looking for.
