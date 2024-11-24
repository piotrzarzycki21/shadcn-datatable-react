import { AppConst, User } from '@/models/core';
import { Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Input } from '../../shadcn/input';
import { Label } from '../../shadcn/label';
import { z } from 'zod';

export function EditableCell({
    getValue,
    row: { index },
    column: { id },
    table,
  }: {
    getValue: () => number;
    row: { index: number };
    column: { id: string };
    table: Table<User>;
  }) {
    const initialValue = getValue();
        // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const columnSchema = z.coerce
      .number()
      .min(AppConst.MIN_AGE)
      .max(AppConst.MAX_AGE);
  
        // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      try {
        setHasError(false);
        setErrorMessage('');
        const pValue = columnSchema.parse(value);
  
        table.options.meta?.updateData(index, id, pValue);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrorMessage((error as z.ZodError).issues[0].message);
        } else {
          setErrorMessage('Unexpected error');
        }
  
        setHasError(true);
      }
    };
  
        // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
  
    return (
          <div className="flex flex-col space-y-1">
        <Input
          value={value as number}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          onKeyUp={onBlur}
              className={`${hasError ? 'border-red-500' : 'border-input'}`}
        />
        {hasError && (
          <Label
            className="text-xs font-medium text-destructive"
              style={{ display: hasError ? 'block' : 'none' }}
          >
            {errorMessage}
          </Label>
        )}
      </div>
    );
  }
