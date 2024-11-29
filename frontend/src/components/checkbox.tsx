import React from 'react';
import { Check } from 'lucide-react';

export const CustomCheckbox = ({ label, checked = false, onChange }: { label: string, checked: boolean, onChange: React.ChangeEventHandler<HTMLInputElement> }) => {
    return (
        <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer"
                />
                <div className="w-5 h-5 border-2 rounded-md border-primary/60 transition-all duration-200
                      peer-checked:border-primary peer-checked:bg-primary
                      group-hover:border-primary/80 peer-focus-visible:ring-2 
                      peer-focus-visible:ring-primary/20">
                    <Check
                        className="w-4 h-4 text-primary-foreground absolute top-0.5 left-0.5 
                     opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                        strokeWidth={3}
                    />
                </div>
            </div>
            <span className="text-foreground/80 group-hover:text-foreground transition-colors duration-200">
                {label}
            </span>
        </label>
    );
};

// const DemoContainer = () => {
//     const [isChecked, setIsChecked] = React.useState(false);

//     return (
//         <div className="p-8 space-y-4">
//             <CustomCheckbox
//                 label="Cool animated checkbox"
//                 checked={isChecked}
//                 onChange={(e) => setIsChecked(e.target.checked)}
//             />
//         </div>
//     );
// };

// export default DemoContainer;