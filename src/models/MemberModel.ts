interface MemberModel {
  id?: number;
  owner: string;
  prefix: string;
  name: string;
  profile_pic_url: string;
  color?: string;
}

export default MemberModel;
