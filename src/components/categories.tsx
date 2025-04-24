import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CategoriesProps {
    img: string;
    name: string;
}

export default function Categories({ img, name }: CategoriesProps) {
    return (
        <div className='flex flex-col items-center gap-2 rounded-md p-2 hover:bg-muted cursor-pointer'>
            <Avatar>
                <AvatarImage src={img} className="w-16 h-16" />
                <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            {name}
        </div>
    );
}