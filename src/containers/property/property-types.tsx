import { Icons } from '@/components/custom-ui/icons';
import { Card } from '@/components/ui/card';
import { useFormContext, useWatch } from 'react-hook-form';
import { PropertyTypesFormValues } from './create-property';
import { PropertyTypes } from '@prisma/client';

export function PropertyTypesComponent(): React.JSX.Element {
    useWatch({ name: "type" });
    const {
        register,
        getValues,
        setValue
    } = useFormContext<PropertyTypesFormValues>();


    return (
        <div className="grid grid-cols-3 gap-4 place-items-stretch" {...register('type')} >
            <Card className={`flex flex-col h-60 cursor-pointer hover:border-purple-900
                ${getValues('type') === PropertyTypes.GARAGE ? 'border-purple-900' : ''} 
                `}
                onClick={() => setValue('type', PropertyTypes.GARAGE)}
            >
                <Icons.garage className="self-center" size={8} />
                <p className="text-m self-center">
                    Garage
                </p>
                {getValues('type') === PropertyTypes.GARAGE ?
                    <Icons.checkCircle className='place-self-end text-purple-900' /> : <></>
                }
            </Card>
            <Card className={`flex flex-col h-60 hover:border-purple-900 cursor-pointer  
               ${getValues('type') === PropertyTypes.APARTMENT ? 'border-purple-900' : ''} 
                `}
                onClick={() => setValue('type', PropertyTypes.APARTMENT)}
            >
                <Icons.apartment className="self-center" size={8} />
                <p className="text-m self-center">
                    Wohnung
                </p>
                {getValues('type') === PropertyTypes.APARTMENT ?
                    <Icons.checkCircle className='place-self-end text-purple-900' /> : <></>
                }
            </Card>
            <Card className={`flex flex-col h-60 hover:border-purple-900  cursor-pointer  
             ${getValues('type') === PropertyTypes.HOUSE ? 'border-purple-900' : ''} 
                `}
                onClick={() => { console.log('ho'); setValue('type', PropertyTypes.HOUSE) }}
            >
                <Icons.home className="self-center fill-purple-900" size={8} />
                <p className="text-m self-center">
                    Haus
                </p>
                {getValues('type') === PropertyTypes.HOUSE ?
                    <Icons.checkCircle className='place-self-end text-purple-900' /> : <></>
                }
            </Card>
        </div>
    );
}