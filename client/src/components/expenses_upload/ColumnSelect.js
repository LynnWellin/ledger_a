import React, { useState, useEffect } from 'react';
import { isNil } from 'ramda';
import { css } from 'emotion';
import { getFormatedDate } from '../../utility/utility';
import UploadStep from './UploadStepper.tsx';

const rowStyle = css`
    border: 1px solid black;
    display: flex;
`;

const cellStyle = css`
    flex: 1;
    border-right: 1px solid black;
`;

export default function ColumnSelect({ setExpenses, data, setTypes, types, step, setStep }) {
    const processData = () => {
        const expenses = data.map((row) => ({
            category: isNil(row[types[3]]) ? null : capitalize(row[types[3]].toLowerCase()),
            store: isNil(row[types[2]]) ? null : capitalize(row[types[2]].toLowerCase()),
            amount: isNil(row[types[1]]) || row[types[1]] === '' ? 0 : parseFloat(row[types[1]]),
            date: isNil(row[types[4]]) ? null : getFormatedDate(new Date(row[types[4]])),
        }));
        console.log(expenses);
        setExpenses(expenses);
        setStep(2);
    };

    const capitalize = (item) => {
        return item.replace(/(?:^|\s|-)\S/g, (a) => a.toUpperCase());
    };

    return (
        <UploadStep step={step} setStep={setStep} action={processData}>
            <div className={rowStyle}>
                {data &&
                    data[0] &&
                    data[0].map((_row, ind) => (
                        <ColumnTypeSelect types={types} setTypes={setTypes} index={ind} />
                    ))}
            </div>
            {data?.map((row) => (
                <div className={rowStyle}>
                    {row.map((cell) => (
                        <div className={cellStyle}>{cell}</div>
                    ))}
                </div>
            ))}
        </UploadStep>
    );
}

function ColumnTypeSelect({ index, setTypes, types }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        // If current column has a type set already, find it and update state
        const res = Object.entries(types).find(([key, value]) => value === index);
        if (!isNil(res)) setValue(res[0]);
        else setValue(0);
    }, [types]);

    const updateTypes = (e) => {
        // Filter out all entries that reference the current column
        const update = {};
        const res = Object.entries(types).filter(([key, value]) => value !== index);
        res.forEach(([key, val]) => (update[key] = val));
        setTypes({ ...update, [e.target.value]: index });
    };

    return (
        <select value={value} className={cellStyle} onChange={updateTypes}>
            <option value={0}></option>
            <option value={1}>Amount</option>
            <option value={2}>Store</option>
            <option value={3}>Category</option>
            <option value={4}>Date</option>
        </select>
    );
}
