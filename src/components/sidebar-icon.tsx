import { SVGProps } from "react";

const SidebarIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    // <svg
    //   className="flex-shrink-0 size-3.5"
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="24"
    //   height="24"
    //   viewBox="0 0 24 24"
    //   fill="none"
    //   stroke="currentColor"
    //   strokeWidth="2"
    //   strokeLinecap="round"
    //   strokeLinejoin="round"
    //
    // >
    //   <line x1="3" x2="21" y1="6" y2="6" />
    //   <line x1="3" x2="21" y1="12" y2="12" />
    //   <line x1="3" x2="21" y1="18" y2="18" />
    // </svg>

    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="0.5"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.17157 4.1716C2 5.34318 2 7.2288 2 11V13C2 16.7713 2 18.6569 3.17157 19.8285C4.34315 21 6.22876 21 10 21H14C14.0843 21 14.9176 21.0001 15 21.0001L15 3.00006C14.9176 3.00005 14.0843 3.00003 14 3.00003H10C6.22876 3.00003 4.34315 3.00003 3.17157 4.1716Z"
        fill={props.fill || "#1C274C"}
      />
      <path
        d="M22 13V11C22 7.22876 22 5.34315 20.8284 4.17157C19.8541 3.19724 17.6359 3.03321 15 3.00559V20.9944C17.6359 20.9668 19.8541 20.8028 20.8284 19.8284C22 18.6569 22 16.7712 22 13Z"
        fill={props.fill || "#1C274C"}
      />
    </svg>
  );
};

export default SidebarIcon;
