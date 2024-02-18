import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('brand')
export class Brand {
    @PrimaryColumn()
    id: number;

    @Column({
        comment: '品牌名称',
        default: '',
    })
    @IsNotEmpty()
    name: string;

    @Column({
        comment: '图片',
        default: '',
    })
    img?: string;

    @Column({
        comment: '排序',
        default: 0,
    })
    sort?: number;

    @Column({
        comment: '是否使用',
        default: true,
    })
    isUse: boolean;
}
