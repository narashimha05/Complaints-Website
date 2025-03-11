import React from 'react'
const issues = [{ issue: "", resolved: "false" }]
const Pages = () => {
  const handlechange = (e) => { 
    
  }
  return (
    

    <div className="absolute inset-0 -z-10 h-full w-full  px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] items-center"
    >
      <div className='flex justify-center items-start mt-20 bg-transparent'>
        <table className="w-[70vw] divide-y divide-x divide-gray-100 border border-gray-200 bg-transparent text-white z-20 ">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-center font-medium uppercase tracking-wider">
                Issue
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium uppercase tracking-wider">
                Resolved?
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-x divide-gray-200">
            {issues.map((issue, index) => (
              <tr key={index}>
                <td className="ml-4 px-6 py-4 whitespace-nowrap text-left font-normal text-white z-20">
                  {issue.issue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-normal text-white z-20 " >
                  <input
                    className="h-6 w-6 text-blue-600 border-gray-300 rounded mr-6"
                    type="checkbox"
                    checked={issue.resolved === "true"}
                    
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Pages
