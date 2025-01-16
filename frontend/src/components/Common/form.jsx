import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

function CommonForm({ 
  formControls, 
  formData, 
  setFormData, 
  onSubmit, 
  buttonText,
  isBtnDisabled
 }) {
  function renderInputsByComponentType(getControlItem) {
    const value = formData[getControlItem.name] || ''; 

    switch (getControlItem.componentType) {
      case 'input':
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

      case 'select':
        return (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options?.length > 0 ? (
                getControlItem.options.map((optionItem) => (
                  <SelectItem key={optionItem.id} value={optionItem.id}>
                    {optionItem.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No options available</SelectItem>
              )}
            </SelectContent>
          </Select>
        );

      case 'textarea':
        return (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

      default:
        return <div>Unsupported component type: {getControlItem.componentType}</div>;
    }
  }

  if (!formControls || formControls.length === 0) {
    return <div>No form controls available</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <button disabled={isBtnDisabled} type="submit"         
      className="mt-2 w-full bg-foreground text-background py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-foreground">
        {buttonText || 'Submit'}
      </button>
    </form>
  );
}

export default CommonForm;
